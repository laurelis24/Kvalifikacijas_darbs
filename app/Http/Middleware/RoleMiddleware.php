<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{   
    
    public function handle(Request $request, Closure $next, string $role):Response
    {
        
        if (!$request->user() || !$request->user()->hasRole($role)) {
            // return inertia('Error', [
            //     '403' => 'You do not have the required user role.',
                
            // ])
            // ->toResponse($request)
            // ->setStatusCode(403);
            return Inertia::render("Error", 
                ['error' =>[
                    'message' => 'You do not have the required user role.',
                    'code' => 403,
                ]]
            )->toResponse($request)->setStatusCode(403);
        };

        

        return $next($request);
    }
}
