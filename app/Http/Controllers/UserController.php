<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Roles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Redirect;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $users = User::where('id', '!=', $request->user()->id)
            ->get()
            ->map(function ($user) {
                $user->roles = $user->roles()->pluck('name');
                $user->is_banned = $user->isBanned();

                return $user;
            });

        return Inertia::render('Admin/Users', [
            'users' => $users,

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
    public function destroy(Request $request, User $user)
    {

        try {
            if ($request->user()->id != $user->id) {
                $user->delete();
            }

            return Redirect::back();
        } catch (\Exception $e) {
            abort(500);
        }
    }

    public function banUser(Request $request, User $user)
    {
        $request->validate([
            'duration' => 'required|integer|min:1|max:525000',
            'reason' => 'required|string|min:1|max:300',
        ]);

        try {
            if ($user->isBanned()) {
                $user->bannedUsers()->updateExistingPivot($user->id, [
                    'banned_until' => now()->addMinutes((int) $request->input('duration', 120)),
                    'reason' => $request->input('reason', 'No reason provided.'),
                ]);
            } else {
                $user->bannedUsers()->attach($user->id, [
                    'banned_until' => now()->addMinutes((int) $request->input('duration', 120)),
                    'reason' => $request->input('reason', 'No reason provided.'),
                ]);
            }
        } catch (\Throwable $th) {
            Log::debug($th->getMessage());
            abort(500);
        }

        return Redirect::back();
    }

    public function unbanUser(User $user)
    {
        $user->bannedUsers()->detach($user->id);

        return Redirect::back();
    }

    public function giveRolePermission(Request $request, User $user)
    {

        try {
            $request->validate([
                'adminChecked' => 'required|boolean',
                'moderatorChecked' => 'required|boolean',
            ]);

            $adminRole = Role::where('name', Roles::ADMIN)->first();
            $moderatorRole = Role::where('name', Roles::MODERATOR)->first();

            if ($request->input('adminChecked') && ! $user->hasRole(Roles::ADMIN)) {
                $user->roles()->attach($adminRole->id);
            } elseif (! $request->input('adminChecked') && $user->hasRole(Roles::ADMIN)) {
                $user->roles()->detach($adminRole->id);
            }

            if ($request->input('moderatorChecked') && ! $user->hasRole(Roles::MODERATOR)) {
                $user->roles()->attach($moderatorRole->id);
            } elseif (! $request->input('moderatorChecked') && $user->hasRole(Roles::MODERATOR)) {
                $user->roles()->detach($moderatorRole->id);
            }

            return Redirect::back();

        } catch (\Throwable $th) {
            abort(500);
        }

    }

    // Check if a user is banned
    public function checkBanStatus()
    {
        // $user = User::findOrFail($userId);
        // $banRecord = $this->bannedUsers->where('user_id', $this->id)->first();

        // if ($banRecord && $banRecord->pivot->banned_until > now()) {
        //     return response()->json([
        //         'message' => 'User is banned.',
        //         'banned_until' => $banRecord->pivot->banned_until,
        //         'reason' => $banRecord->pivot->reason,
        //     ]);
        // }

        // return response()->json(['message' => 'User is not banned.']);
    }
}
