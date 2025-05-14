<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\PostCategory;
use App\Services\WeatherService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Redirect;
use Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'sort' => 'in:newest,oldest,most_commented',
            'per_page' => 'integer|min:10|max:1000',
        ]);
        $sort = $validated['sort'] ?? 'newest';
        $perPage = $validated['per_page'] ?? 50;

        $categories = PostCategory::select('id', 'title', 'description', 'color')->get();
        $query = Post::with(['randomMedia:id,file_path,media_type,post_id'])
            ->select('id', 'title', 'created_at', 'coordinates', 'category_id');

        $query = $this->applySorting($query, $sort);

        $posts = $query->limit($perPage)->withCount('comments')->get();

        return Inertia::render('Welcome', [
            'posts' => $posts,
            'categories' => $categories,
            'filter' => [
                'sort' => $sort,
                'per_page' => $perPage,
            ],
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    private function applySorting($query, $sort)
    {
        return match ($sort) {
            'oldest' => $query->orderBy('created_at', 'asc'),
            'most_commented' => $query->withCount('comments')->orderBy('comments_count', 'desc'),
            default => $query->orderBy('created_at', 'desc'),
        };
    }

    public function weather(Post $post, WeatherService $weatherService)
    {
        return response()->json($weatherService->getWeatherByCoords($post->id, $post->coordinates));
    }

    public function create(Request $request)
    {

        if ($request->user()->isBanned()) {
            abort(403, __('messages.banned_user'));
        }

        return Inertia::render('CreateUpdatePost', [
            'categories' => PostCategory::select('id', 'title', 'description', 'color')->get(),

        ]);
    }

    public function store(StorePostRequest $request)
    {

        if ($request->user()->isBanned()) {
            abort(403, __('messages.banned_user'));
        }

        $validated = $request->validated();
        $post = Post::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'category_id' => $validated['category'],
            'description' => $validated['description'],
            'coordinates' => $validated['coordinates'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');

                $post->media()->create(
                    ['media_type' => 'image',
                        'file_path' => $path]
                );
            }
        }

        return redirect()->route('posts.show', $post);
    }

    public function show(Post $post)
    {

        $latestCommentedPosts = Post::withCount('comments')
            ->with('media', 'category')
            ->whereHas('comments')
            ->where('id', '!=', $post->id)
            ->orderByDesc(
                DB::table('posts_comments')
                    ->select('created_at')
                    ->whereColumn('post_id', 'posts.id')
                    ->latest()
                    ->take(1)
            )
            ->limit(10)
            ->get()
            ->map(fn ($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'created_at' => $post->created_at,
                'comment_count' => $post->comments_count,
                'color' => $post->category->color,
            ]);

        $formattedPost = [
            'id' => $post->id,
            'title' => $post->title,
            'description' => $post->description,
            'username' => $post->user->username,
            'created_at' => $post->created_at,
            'owner' => auth()->id() === $post->user_id,
            'coordinates' => [
                'latitude' => (float) $post->coordinates['latitude'],
                'longitude' => (float) $post->coordinates['longitude'],
            ],
            'media' => $post->media->map(fn ($media) => [
                'id' => $media->id,
                'file_path' => $media->file_path,
                'media_type' => $media->media_type,
            ]),
            'category' => [
                'title' => $post->category->title,
                'color' => $post->category->color,
            ],
            'comment_count' => $post->comments()->count(),
        ];

        return Inertia::render('Post', [
            'post' => $formattedPost,
            'latest_posts' => $latestCommentedPosts,
        ]);
    }

    public function comments(Post $post, $page)
    {
        $commentsPerPage = 10;
        $comments = $post->comments()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate($commentsPerPage, ['*'], 'page', $page);

        return response()->json([
            'comments' => $comments->map(fn ($comment) => [
                'id' => $comment->id,
                'comment' => $comment->comment,
                'created_at' => $comment->created_at,
                'username' => $comment->user->username,
                'owner' => auth()->id() === $comment->user_id,
            ]),
            'comments_meta' => [
                'current_page' => $comments->currentPage(),
                'last_page' => $comments->lastPage(),
            ],
        ]);
    }

    public function latestComment(Post $post)
    {

        // Paginate the comments and eager load the user relationship for the comments only
        $comment = $post->comments()
            ->with('user') // Ensure user relation is loaded
            ->latest('created_at') // Order by created_at to get the most recent comment
            ->first(); // Get only the latest comment

        return response()->json([
            'id' => $comment->id,
            'comment' => $comment->comment,
            'created_at' => $comment->created_at,
            'username' => $comment->user->username,
            'owner' => auth()->id() === $comment->user_id, // Check if the current user is the owner
        ]);
    }

    public function edit(Request $request, Post $post)
    {
        if ($request->user()->isBanned() || $request->user()->cannot('createUpdateDelete', $post)) {
            abort(403);
        }

        $post->load(['media']);
        $formattedPost = [
            'id' => $post->id,
            'title' => $post->title,
            'description' => $post->description,
            'coordinates' => $post->coordinates,
            'category_id' => $post->category_id,
            'media' => $post->media->map(fn ($media) => [
                'id' => $media->id,
                'file_path' => $media->file_path,
                'media_type' => $media->media_type,
            ]),
        ];

        return Inertia::render('CreateUpdatePost', [
            'categories' => PostCategory::select('id', 'title', 'color')->get(),
            'post' => $formattedPost,
        ]);
    }

    public function update(StorePostRequest $request, Post $post)
    {

        if ($request->user()->isBanned() || $request->user()->cannot('createUpdateDelete', $post)) {
            abort(403);
        }

        $validated = $request->validated();
        $post->update([
            'title' => $validated['title'],
            'category_id' => $validated['category'],
            'description' => $validated['description'],
            'coordinates' => $validated['coordinates'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($post->media as $media) {
                Storage::disk('public')->delete($media->file_path);
                $media->delete();
            }

            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');

                $post->media()->create([
                    'media_type' => 'image',
                    'file_path' => $path,
                ]);
            }

        }

        return back();

    }

    public function destroy(Request $request, Post $post)
    {
        if ($request->user()->isBanned() || $request->user()->cannot('createUpdateDelete', $post)) {
            abort(403);
        }

        $post->delete();

        return Redirect::route('main');
    }
}
