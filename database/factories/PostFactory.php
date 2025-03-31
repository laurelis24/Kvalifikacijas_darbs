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
            'description' => '[]',
            'category_id' => PostCategory::inRandomOrder()->first()->id,
            'coordinates' => [
                'latitude' => fake()->latitude(55.5, 58),
                'longitude' => fake()->longitude(21, 28),
            ],
        ];
    }
}
