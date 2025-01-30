<?php

namespace Database\Factories;

use App\Models\Post;
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
            'title' => $this->faker->sentence,       // Random title
            'description' => $this->faker->text(400), // Random description
            'coordinates' => json_encode([
                'latitude' => $this->faker->latitude,
                'longitude' => $this->faker->longitude
            ]), 
        ];
    }
}
