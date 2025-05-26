<?php

use App\Models\Post;
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

test('only admin can manage user roles', function () {
    auth()->logout();
    $this
        ->put("admin/users/manage/roles/{$this->user->id}", Utils::userManageRolesParam())
        ->assertRedirect();

    expect($this->user->hasRole(Roles::ADMIN))->toBeFalse();

    $this->actingAs($this->user)
        ->put("admin/users/manage/roles/{$this->user->id}", Utils::userManageRolesParam())
        ->assertForbidden();
    expect($this->user->hasRole(Roles::ADMIN))->toBeFalse();

    $this->actingAs($this->moderator)
        ->put("admin/users/manage/roles/{$this->user->id}", Utils::userManageRolesParam())
        ->assertForbidden();

    expect($this->user->hasRole(Roles::ADMIN))->toBeFalse();

    $this->actingAs($this->admin)
        ->put("admin/users/manage/roles/{$this->user->id}", Utils::userManageRolesParam())
        ->assertRedirect();

    expect($this->user->hasRole(Roles::ADMIN))->toBeTrue();
});

test('only owner or admin/moderator can delete/edit post', function () {
    $roles = Roles::all();
    foreach ($roles as $role) {
        Role::firstOrCreate(['name' => $role]);
    }

    $owner = User::factory()->create();
    $owner->roles()->attach(3);
    $admin = User::factory()->create();
    $admin->roles()->attach([1, 3]);
    $moderator = User::factory()->create();
    $moderator->roles()->attach([1, 2]);
    $otherUser = User::factory()->create();
    $otherUser->roles()->attach(3);
    $category = PostCategory::factory()->create();

    $post1 = Post::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
    ]);

    $post2 = Post::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
    ]);

    $post3 = Post::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
    ]);

    // owner, admin, moderator can edit post
    $this->actingAs($otherUser)
        ->post(route('posts.edit', Utils::postParams($post1, $category)))
        ->assertForbidden();

    $this->actingAs($owner)
        ->post(route('posts.edit', Utils::postParams($post1, $category)))
        ->assertRedirect(route('main'));

    $this->actingAs($admin)
        ->post(route('posts.edit', Utils::postParams($post1, $category)))
        ->assertRedirect(route('main'));

    $this->actingAs($moderator)
        ->post(route('posts.edit', Utils::postParams($post1, $category)))
        ->assertRedirect(route('main'));

    // owner, admin, moderator can delete post
    $this->actingAs($otherUser)
        ->delete(route('posts.delete', ['post' => $post1->id]))
        ->assertForbidden();

    $this->actingAs($owner)
        ->delete(route('posts.delete', ['post' => $post1->id]))
        ->assertRedirect(route('main'));

    $this->actingAs($admin)
        ->delete(route('posts.delete', ['post' => $post2->id]))
        ->assertRedirect(route('main'));

    $this->actingAs($moderator)
        ->delete(route('posts.delete', ['post' => $post3->id]))
        ->assertRedirect(route('main'));

    $this->assertDatabaseMissing('posts', ['id' => $post1->id]);
    $this->assertDatabaseMissing('posts', ['id' => $post2->id]);
    $this->assertDatabaseMissing('posts', ['id' => $post3->id]);

});
