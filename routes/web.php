<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class, 'index'])->name('main');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/rules', function () {
    return Inertia::render('Rules');
})->name('rules');

Route::get('/rules', function () {
    return Inertia::render('Rules');
})->name('rules');

Route::get('/', [PostController::class, 'index'])->name('main');
Route::get('/weather/{post}', [PostController::class, 'weather'])->name('weather');
Route::get('/posts/show/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/posts/show/{post}/comments/{page}', [PostController::class, 'comments'])->name('posts.comments');
Route::get('/posts/{post}/comments/latest', [PostController::class, 'latestComment'])->name('posts.comments.latest');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
