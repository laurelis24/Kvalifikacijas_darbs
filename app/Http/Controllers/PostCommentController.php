<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        if ($request->user()->isBanned()) {
            abort(405);
        }

        $validated = $request->validate([
            'comment' => 'required|string|min:3|max:500',
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'comment' => $validated['comment'],
        ]);

        return back();
    }
}
