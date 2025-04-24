<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\PostCategoryController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    //  Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // });

    Route::post('api/ping-online', function () {
        if (Auth::check()) {
            Cache::put('user-is-online-'.Auth::id(), true, now()->addMinutes(5));
        }

        return response()->noContent(); // 204
    });

    // / User posts
    Route::get('/posts/create', [PostController::class, 'create'])
        ->name('posts.create');
    Route::post('/posts/create', [PostController::class, 'store'])
        ->name('posts.create');
    Route::get('/posts/edit/{post}', [PostController::class, 'edit'])
        ->name('posts.edit');
    Route::post('/posts/edit/{post}', [PostController::class, 'update'])
        ->name('posts.update');
    Route::delete('/posts/delete/{post}', [PostController::class, 'destroy'])
        ->name('posts.delete');

    // User post comments
    Route::post('/posts/{post}/comments/store', [PostCommentController::class, 'store'])
        // ->middleware("throttle:comment")
        ->name('posts.comment.store');
    Route::delete('/posts/comments/{comment}', [PostCommentController::class, 'destroy'])
        // ->middleware("throttle:comment")
        ->name('posts.comment.delete');

    Route::middleware([RoleMiddleware::class.':admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'statistics']);

        // Admin user management
        Route::get('/users', [UserController::class, 'index']);
        Route::delete('/users/delete/{user}', [UserController::class, 'destroy']);
        Route::post('/users/ban/{user}', [UserController::class, 'banUser']);
        Route::delete('/users/remove/ban/{user}', [UserController::class, 'unbanUser']);
        Route::put('/users/manage/roles/{user}', [UserController::class, 'giveRolePermission']);

        // Admin post categories management
        Route::get('/categories', [PostCategoryController::class, 'index']);
        Route::post('/categories/create', [PostCategoryController::class, 'store']);
        Route::post('/categories/update/{postCategory}', [PostCategoryController::class, 'update']);
        Route::delete('/categories/delete/{postCategory}', [PostCategoryController::class, 'destroy']);
    });
});
