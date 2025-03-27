<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // $categories = DtoMapper::toDTOCollection(PostCategory::all(), ['created_at', 'updated_at']);

        return Inertia::render('CreatePost', [
            'categories' => PostCategory::select('id', 'title', 'description')->get(),

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        // if ($request->fails()) {
        //     dd($request->errors());
        // }

        $post = Post::create([
            'title' => $validated['title'],
            'category_id' => $validated['category'],
            'description' => $validated['description'],
            'coordinates' => json_encode($validated['coordinates']),
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

    /**
     * Display the specified resource.
     */
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
