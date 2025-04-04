<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Role;
use App\Models\User;
use App\Roles;
use Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // TODO: this needs to be changed
        $roles = Roles::all();

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        $admin = User::create([
            'name' => 'Lauris',
            'username' => 'laurelis',
            'email' => 'test@inbox.lv',
            'password' => Hash::make('12345678'), // Set a password
        ]);

        $moderator = User::create([
            'name' => 'Lauris',
            'username' => 'moderator',
            'email' => 'mod@inbox.lv',
            'password' => Hash::make('12345678'), // Set a password
        ]);
        $user = User::create([
            'name' => 'Lauris',
            'username' => 'user',
            'email' => 'user@inbox.lv',
            'password' => Hash::make('12345678'), // Set a password
        ]);

        $admin->roles()->attach(1);
        $admin->roles()->attach(3);

        $moderator->roles()->attach(2);
        $user->roles()->attach(3);

        User::factory(10)->create();
        PostCategory::factory(5)->create();
        Post::factory(30)->create();
    }
}
