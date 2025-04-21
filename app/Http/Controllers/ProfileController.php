<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $ban = $user->bannedUsers()
            ->where('user_id', $user->id)
            ->where('banned_until', '>', now())
            ->first();

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'posts' => $user->posts->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'created_at' => $post->created_at,
                    'category' => [
                        'title' => $post->category->title,
                        'color' => $post->category->color,
                    ],
                ];
            }),
            'ban' => $ban ? ['reason' => $ban->pivot->reason, 'banned_until' => $ban->pivot->banned_until] : null,
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {

        Log::debug('Profile update requested', $request->validated());

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
