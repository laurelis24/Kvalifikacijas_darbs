<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function statistics()
    {

        $users = User::all();
        $count = $users->filter(fn ($user) => Cache::has('user-is-online-'.$user->id))->count();

        $postsCreatedLastWeek = Post::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as post_count'))
            ->whereDate('created_at', '>=', now()->subWeek())  // Get posts from the last 7 days
            ->groupBy(DB::raw('DATE(created_at)'))  // Group by date
            ->orderBy(DB::raw('DATE(created_at)'))  // Order by date ascending
            ->get();

        $postsByCategory = PostCategory::withCount('posts')
            ->whereHas('posts') // optional: only categories that have posts
            ->get(['id', 'title', 'color'])
            ->map(fn ($category) => [
                'title' => $category->title,
                'color' => $category->color,
                'count' => $category->posts_count,
            ]);

        return Inertia::render('Admin/Dashboard', [
            'usersOnline' => $count,
            'postsCreatedLastWeek' => $postsCreatedLastWeek,
            'postsByCategory' => $postsByCategory,
        ]);
    }
}
