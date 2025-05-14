<?php

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Role;
use App\Models\User;
use App\Roles;
use Tests\Utils;

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
