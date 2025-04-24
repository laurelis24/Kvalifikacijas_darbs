<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
use Redirect;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Categories', [
            'categories' => PostCategory::select('id', 'title', 'description', 'color')->get(),
        ]);
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

        $validated = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'description' => 'required|string|max:1000|min:20',
            'color' => 'required|string|regex:/^#[0-9a-fA-F]{6}$/',
        ]);

        try {
            PostCategory::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'color' => $validated['color'],
            ]);

            return Redirect::back();
        } catch (\Throwable $th) {
            Log::info('Message', [$th->getMessage()]);
            abort(500);
        }
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
    public function update(Request $request, PostCategory $postCategory)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'description' => 'required|string|max:2000|min:30',
            'color' => 'required|string|regex:/^#[0-9a-fA-F]{6}$/',
        ]);

        try {
            $category = PostCategory::findOrFail($postCategory->id);

            $category->title = $validated['title'];
            $category->description = $validated['description'];
            $category->color = $validated['color'];

            $category->save();

            return Redirect::back();

        } catch (\Throwable $th) {
            abort(500, $th->getMessage());
        }
    }

    public function destroy(PostCategory $postCategory)
    {
        try {
            $category = PostCategory::findOrFail($postCategory->id);
            $category->delete();

            return Redirect::back();

        } catch (\Throwable $th) {
            abort(500);
        }
    }
}
