<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        if ($request->user()->isBanned()) {
            abort(405);
        }

        $validated = $request->validate([
            'comment' => 'required|string|min:1|max:500',
        ]);

        $post->comments()->create([
            'user_id' => $request->user()->id,
            'comment' => $validated['comment'],
        ]);

        return back();
    }

    public function destroy(Request $request, PostComment $comment)
    {
        if ($request->user()->isBanned() || $request->user()->cannot('updateDelete', $comment)) {
            abort(403);
        }

        $comment->delete();

        return back();
    }
}
