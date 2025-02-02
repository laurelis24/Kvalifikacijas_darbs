<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Translation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $categories = PostCategory::all();

        foreach ($categories as $category) {
            //Log::info($category->getTranslation('title', 'lv'));
            $category->title = $category->getTranslation('title');
            $category->description = $category->getTranslation('description');

            
        }
        return Inertia::render("Posts", [
            //'posts' => __('posts'),
            'categories' => $categories
        ]);
        // $posts = Post::paginate();
        // return Inertia::render('Posts', [
        //     'posts' => $posts,
        //     'welcome' => __('welcome'),
        //     'login' => __('login'),
        //     'register' => __('register'),
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
