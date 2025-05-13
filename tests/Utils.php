<?php

namespace Tests;

class Utils
{
    public static function postParams(int $postId, int $categoryId)
    {
        return [
            'post' => $postId,
            'title' => fake()->sentence(),
            'category' => $categoryId,
            'coordinates' => [
                'latitude' => fake()->latitude(55.5, 58),
                'longitude' => fake()->longitude(22, 26),
            ],
            'description' => '[{"type":"paragraph","children":[{"text":""}]}]',
        ];
    }

    public static function categoryParams(string $title = 'Test category', string $description = 'This is a test description text for post category. This must be atleast 50 chars if I remember correctly.', string $color = '#ff5733')
    {
        return [
            'title' => $title,
            'description' => $description,
            'color' => $color,
        ];
    }

    public static function userBanParams(int $duration = 120, string $reason = 'This is a user ban reason for testing')
    {
        return [
            'duration' => $duration,
            'reason' => $reason,

        ];
    }
}
