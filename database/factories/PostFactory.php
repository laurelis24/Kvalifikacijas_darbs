<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
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
            'user_id' => User::inRandomOrder()->first()->id,
            'title' => fake()->sentence,
            'description' => '[{"type":"paragraph","children":[{"text":""}]}]',
            'category_id' => 1,
            'coordinates' => [
                'latitude' => fake()->latitude(55.5, 58),
                'longitude' => fake()->longitude(22, 26),
            ],
            'created_at' => fake()->dateTime(),
        ];
    }
}
// PostCategory::inRandomOrder()->first())->id
