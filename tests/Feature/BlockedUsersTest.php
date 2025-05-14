<?php

use App\Models\Role;
use App\Models\User;
use App\Roles;

beforeEach(function () {
    $roles = Roles::all();
    foreach ($roles as $role) {
        Role::firstOrCreate(['name' => $role]);
    }
    $this->user = User::factory()->create();
    $this->user->roles()->attach(Role::where('name', Roles::USER)->first()->id);
});
