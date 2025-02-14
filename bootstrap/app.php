<?php

use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\LanguageMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
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
            LanguageMiddleware::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        //  $middleware->use([
        //     LanguageMiddleware::class,
        // ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (HttpException $exception, Request $request) {

            try {
                return Inertia::render('Error', [
                    'message' => __('messages.'.$exception->getStatusCode()),
                    'code' => $exception->getStatusCode(),
                    'back' => __('messages.back'),
                ])
                    ->toResponse($request)
                    ->setStatusCode($exception->getStatusCode());
            } catch (\Throwable $th) {
                return Inertia::render('Error', [
                    'message' => __('messages.500'),
                    'code' => 500,
                    'back' => __('messages.back'),
                ])->toResponse($request)->setStatusCode(500);
            }

        });

    })->create();
