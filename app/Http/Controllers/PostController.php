<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\PostCategory;
use App\Services\WeatherService;
use Illuminate\Http\Request;
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
            'per_page' => 'integer|min:5|max:100',
        ]);
        $sort = $validated['sort'] ?? 'newest';
        $perPage = $validated['per_page'] ?? 20;

        $categories = PostCategory::select('id', 'title', 'description', 'color')->get();
        $query = Post::with(['randomMedia:id,file_path,media_type,post_id'])
            ->select('id', 'title', 'created_at', 'coordinates', 'category_id');

        $query = $this->applySorting($query, $sort);

        $posts = $query->limit($perPage)->withCount('comments')->get();

        return Inertia::render('WelcomeTest', [
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

        return Inertia::render('CreatePost', [
            'categories' => PostCategory::select('id', 'title', 'description', 'color')->get(),

        ]);
    }

    public function store(StorePostRequest $request)
    {

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

        return Redirect::back();
    }

    public function show(Post $post)
    {
        $post->load(['media', 'comments']);

        $formattedPost = [
            'id' => $post->id,
            'title' => $post->title,
            'description' => $post->description,
            'created_at' => $post->created_at,
            'media' => $post->media->map(fn ($media) => [
                'id' => $media->id,
                'file_path' => $media->file_path,
                'media_type' => $media->media_type,
            ]),
            'comments' => $post->comments->map(fn ($comment) => [
                'id' => $comment->id,
                'comment' => $comment->comment,
                'created_at' => $comment->created_at,
                'username' => $comment->user->username,
            ]),
        ];

        return Inertia::render('PostShow', [
            'post' => $formattedPost,
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

        return Inertia::render('EditPost', [
            'categories' => PostCategory::select('id', 'title', 'color')->get(),
            'postData' => $formattedPost,
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

    public function delete(Request $request, Post $post)
    {
        if ($request->user()->isBanned() || $request->user()->cannot('createUpdateDelete', $post)) {
            abort(403);
        }

        $post->delete();

        return Redirect::route('main');
    }
}
