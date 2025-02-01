<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Log;
use Symfony\Component\HttpFoundation\Response;

class LanguageMiddleware
{
    
    public function handle($request, Closure $next)
    {
            if (Session::has('locale')) {
             App::setLocale(Session::get('locale'));
         }

        return $next($request);
    }
}
