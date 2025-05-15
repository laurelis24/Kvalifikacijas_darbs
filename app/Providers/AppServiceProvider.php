<?php

namespace App\Providers;

// use Illuminate\Cache\RateLimiting\Limit;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\RateLimiter;
use App\InertiaHttpGateway;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Ssr\HttpGateway;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public $bindings = [
        HttpGateway::class => InertiaHttpGateway::class,
    ];

    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (env('APP_ENV') !== 'local') {
            URL::forceScheme('https'); // <-- force HTTPS
        }

        Vite::prefetch(concurrency: 3);

        // RateLimiter::for('comment', function (Request $request) {
        //     // return Limit::perMinute(1)->
        //     return Limit::perMinute(1)
        //         ->by($request->user()?->id ?: $request->ip());
        // });

    }
}
