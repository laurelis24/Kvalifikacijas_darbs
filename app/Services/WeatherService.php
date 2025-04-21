<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class WeatherService
{
    protected string $apiKey;

    public function __construct()
    {
        $this->apiKey = env('WEATHER_API_KEY');
    }

    public function getWeatherByCoords(int $postId, $coords): ?array
    {
        if (! isset($coords['latitude'], $coords['longitude'])) {
            return null;
        }

        $cacheKey = "weather_$postId";
        $cacheTime = now()->addMinutes(60);

        return Cache::remember($cacheKey, $cacheTime, function () use ($coords) {
            $latitude = $coords['latitude'];
            $longitude = $coords['longitude'];

            $response = Http::get('http://api.weatherapi.com/v1/current.json', [
                'key' => $this->apiKey,
                'q' => "$latitude,$longitude",
            ]);

            if ($response->successful()) {
                $weather = $response->json();

                return [
                    'temp_c' => $weather['current']['temp_c'],
                    'icon' => $weather['current']['condition']['icon'],
                ];
            }

            return null;
        });

    }
}
