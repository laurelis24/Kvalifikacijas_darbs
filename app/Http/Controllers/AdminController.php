<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function statistics()
    {

        $onlineUsers = DB::table('sessions')
            ->whereNotNull('user_id')
            ->where('last_activity', '>=', now()->subMinutes(5)->timestamp)
            ->pluck('user_id');

        return Inertia::render('Admin/Dashboard', [
            'usersOnline' => $onlineUsers->count(),
        ]);
    }
}
