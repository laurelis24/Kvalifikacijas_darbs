<?php

namespace App\Http\Controllers;

use App\DtoMapper;
use App\Http\Requests\StorePostRequest;
use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
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
        $post->load("media");
        $images = $post->media()->get(["id", "file_path", "media_type"]);
        //$images = $post->media->map(fn ($media) => asset('storage/' . $media->file_path));
        Log::info("Images", [$images]);
        return Inertia::render("PostShow", [
            "post" => $post,
            "images" => $images
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
