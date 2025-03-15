<?php

namespace App\Http\Controllers;

use App\DtoMapper;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;

class PostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $categories = DtoMapper::toDTOCollection(PostCategory::all(), ['created_at', 'updated_at']);

        return Inertia::render('Admin/ManageCategories', [
            'categories' => PostCategory::select('id', 'title', 'description')->get(),
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
        $request->validate([
            'title' => 'required|string|max:255|min:3',
            'description' => 'required|string|max:2000|min:30',
        ]);

        try {
            PostCategory::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
            ]);

            return Redirect::back();
        } catch (\Throwable $th) {
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

        $request->validate([
            'title' => 'required|string|max:255|min:3',
            'description' => 'required|string|max:2000|min:30',
        ]);

        try {
            $category = PostCategory::findOrFail($postCategory->id);

            $category->title = $request->input('title');
            $category->description = $request->input('description');

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
