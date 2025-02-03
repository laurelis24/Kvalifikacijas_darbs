<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {

        if (! $request->user() || ! $request->user()->hasRole($role)) {
            return Inertia::render('Error',
                [
                    'message' => "You do not have the required user role.",
                    'code' => 403,
                ]
            )->toResponse($request)->setStatusCode(403);
           
        }

        return $next($request);
    }
}
