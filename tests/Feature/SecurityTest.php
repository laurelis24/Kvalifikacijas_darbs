<?php

use App\Models\PostCategory;
use App\Models\Role;
use App\Models\User;
use App\Roles;
use Tests\Utils;

beforeEach(function () {
    $roles = Roles::all();
    foreach ($roles as $role) {
        Role::firstOrCreate(['name' => $role]);
    }
    $this->user = User::factory()->create();
    $this->user->roles()->attach(Role::where('name', Roles::USER)->first()->id);

    $this->admin = User::factory()->create();
    $this->admin->roles()->attach(Role::where('name', Roles::USER)->first()->id);
    $this->admin->roles()->attach(Role::where('name', Roles::ADMIN)->first()->id);

    $this->moderator = User::factory()->create();
    $this->moderator->roles()->attach(Role::where('name', Roles::USER)->first()->id);
    $this->moderator->roles()->attach(Role::where('name', Roles::MODERATOR)->first()->id);
});

test('only admin can access admin panel', function () {
    $routes = ['admin/dashboard', 'admin/categories', 'admin/users'];

    foreach ($routes as $route) {
        auth()->logout();
        $this
            ->get($route)
            ->assertRedirect('login');

        $this->actingAs($this->user)
            ->get($route)
            ->assertForbidden();

        $this->actingAs($this->moderator)
            ->get($route)
            ->assertForbidden();

        $this->actingAs($this->admin)
            ->get($route)
            ->assertOk();
    }
});

test('only admin can create/delete/edit post categories', function () {
    auth()->logout();
    // Create category
    $this->post('admin/categories/create', Utils::categoryParams())->assertRedirect('login');

    $this->actingAs($this->user)
        ->post('admin/categories/create', Utils::categoryParams())->assertForbidden();

    $this->actingAs($this->moderator)
        ->post('admin/categories/create', Utils::categoryParams())->assertForbidden();

    $this->actingAs($this->admin)
        ->post('admin/categories/create', Utils::categoryParams())->assertRedirect();

    // Edit category
    auth()->logout();
    $category = PostCategory::find(1);
    $this->post("admin/categories/update/{$category->id}", Utils::categoryParams('Test Update Title'))->assertRedirect('login');

    $this->actingAs($this->user)
        ->post("admin/categories/update/{$category->id}", Utils::categoryParams('Test Update Title'))->assertForbidden();

    $this->actingAs($this->moderator)
        ->post("admin/categories/update/{$category->id}", Utils::categoryParams('Test Update Title'))->assertForbidden();

    $this->actingAs($this->admin)
        ->post("admin/categories/update/{$category->id}", Utils::categoryParams('Test Update Title'))->assertRedirect();

    $category->refresh();
    expect($category->title)->toBe('Test Update Title');

    // Delete category
    auth()->logout();
    $this->delete("admin/categories/delete/{$category->id}")->assertRedirect();

    $this->actingAs($this->user)
        ->delete("admin/categories/delete/{$category->id}")->assertForbidden();

    $this->actingAs($this->moderator)
        ->delete("admin/categories/delete/{$category->id}")->assertForbidden();

    $this->actingAs($this->admin)
        ->delete("admin/categories/delete/{$category->id}")->assertRedirect();

    expect(PostCategory::find($category->id))->toBeNull();
});

test('only admin can delete user', function () {
    auth()->logout();
    $this
        ->delete("admin/users/delete/{$this->user->id}")
        ->assertRedirect();

    $this->actingAs($this->user)
        ->delete("admin/users/delete/{$this->user->id}")
        ->assertForbidden();

    $this->actingAs($this->moderator)
        ->delete("admin/users/delete/{$this->user->id}")
        ->assertForbidden();

    $this->actingAs($this->admin)
        ->delete("admin/users/delete/{$this->user->id}")
        ->assertRedirect();
});

test('only admin can ban user', function () {
    auth()->logout();
    $this
        ->post("admin/users/ban/{$this->user->id}", Utils::userBanParams())
        ->assertRedirect();

    expect($this->user->isBanned())->toBeFalse();

    $this->actingAs($this->user)
        ->post("admin/users/ban/{$this->user->id}", Utils::userBanParams())
        ->assertForbidden();

    expect($this->user->isBanned())->toBeFalse();

    $this->actingAs($this->moderator)
        ->post("admin/users/ban/{$this->user->id}", Utils::userBanParams())
        ->assertForbidden();

    expect($this->user->isBanned())->toBeFalse();

    $this->actingAs($this->admin)
        ->post("admin/users/ban/{$this->user->id}", Utils::userBanParams())
        ->assertRedirect();

    expect($this->user->isBanned())->toBeTrue();
});

test('only admin can unban user', function () {
    $this->actingAs($this->admin)
        ->post("admin/users/ban/{$this->user->id}", Utils::userBanParams())
        ->assertRedirect();

    expect($this->user->isBanned())->toBeTrue();

    auth()->logout();
    $this
        ->delete("admin/users/remove/ban/{$this->user->id}")
        ->assertRedirect();

    expect($this->user->isBanned())->toBeTrue();

    $this->actingAs($this->user)
        ->delete("admin/users/remove/ban/{$this->user->id}")
        ->assertForbidden();

    expect($this->user->isBanned())->toBeTrue();

    $this->actingAs($this->moderator)
        ->delete("admin/users/remove/ban/{$this->user->id}")
        ->assertForbidden();

    expect($this->user->isBanned())->toBeTrue();

    $this->actingAs($this->admin)
        ->delete("admin/users/remove/ban/{$this->user->id}")
        ->assertRedirect();

    expect($this->user->isBanned())->toBeFalse();
});
