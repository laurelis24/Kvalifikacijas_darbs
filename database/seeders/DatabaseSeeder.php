<?php

namespace Database\Seeders;

use App\Models\Role;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $admin->roles()->attach(1);
        $admin->roles()->attach(3);

    }
}
