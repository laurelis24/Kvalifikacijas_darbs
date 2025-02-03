<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\LanguageMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
            LanguageMiddleware::class,
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        
       $exceptions->render(function(HttpException $exception, Request $request){

              return  Inertia::render( 'Error', [ 'status' => $exception->getStatusCode() ] )
                ->toResponse( $request )
                ->setStatusCode( $exception->getStatusCode() );  
       });

        

    
    })->create();
