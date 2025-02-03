<?php

namespace App\Providers;

use App\Models\Role;
use App\Permissions;
use App\Roles;
use Artisan;
use DB;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Log;
use Schema;

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
    }
}
