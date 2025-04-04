<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::middleware(['locale'])->group(function(){
//     Route::get('/', function () {
//         return Inertia::render('Welcome', [
//             'canLogin' => Route::has('login'),
//             'canRegister' => Route::has('register'),
//             'laravelVersion' => Application::VERSION,
//             'phpVersion' => PHP_VERSION,
//         ]);
//     });
// });

Route::get('/', [PostController::class, 'index'])->name('main');

Route::get('/dashboard', function () {

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

/*
Route::get('/dashboard/statistics', function () {
    $request = request();
    $statistics = $statistics = [
        'totalPosts' => 1000,
        'totalComments' => 300,
    ];

    if (! $request->user() || ! $request->user()->hasRole(Roles::ADMIN)) {
       return response()->json(['message' => "You do not have the required user role.", 'code' => 403], 403);
    }

    return response()->json(['statistics' => $statistics]);
})->middleware(['auth'])->name('dashboard.statistics');
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/posts/show/{post}', [PostController::class, 'show'])->name('posts.show');

require __DIR__.'/auth.php';
