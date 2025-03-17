<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;
use Log;

class PostCommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'comment' => 'required|string|min:3|max:500',
        ]);

        // Log::info('Created: ', $validated);

        // PostComment::create([
        //     'post_id' => $post->id,
        //     'user_id' => auth()->id(),
        //     'comment' => $validated['comment'],
        // ]);

        $post->comments()->create([
            'user_id' => auth()->id(),
            'comment' => $validated['comment'],
        ]);

        return back();
    }
}
