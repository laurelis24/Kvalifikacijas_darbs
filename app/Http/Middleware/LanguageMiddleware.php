<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Log;

class LanguageMiddleware
{
    public function handle($request, Closure $next)
    {
        $locale = Session::get('locale');

        Log::info($locale);
        if (! in_array($locale, ['en', 'lv'])) {
            Session::put('locale', $locale);
        }

        // Log::info($locale);

        App::setLocale(Session::get('locale'));

        return $next($request);
    }
}
