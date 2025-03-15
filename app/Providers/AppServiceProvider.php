<?php

namespace App\Providers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Vite::prefetch(concurrency: 3);
        /* Inertia::share([
            'translations' => function () {
                $locale = App::getLocale();
                return Lang::get('*', [], $locale);  // Fetch all translations
            },
            'locale' => App::getLocale(),
        ]); */
    }
}
