<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence,
            'description' => [],
            'category_id' => PostCategory::inRandomOrder()->first()->id,
            'coordinates' => [
                'latitude' => fake()->latitude(56, 57),  // 56.946285,24.105078
                'longitude' => fake()->longitude(23.5, 24.5),
            ],
        ];
    }
}
