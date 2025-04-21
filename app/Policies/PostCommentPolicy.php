<?php

namespace App\Policies;

use App\Models\PostComment;
use App\Models\User;

class PostCommentPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function updateDelete(User $user, PostComment $comment): bool
    {
        return $user->id === $comment->user_id || $user->hasRole('admin') || $user->hasRole('moderator');
    }
}
