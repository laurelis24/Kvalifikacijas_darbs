<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\PostCategory;
use App\Models\Translation;
use App\Roles;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;




// Route::middleware('lang')

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

Route::get('/', function () {
    
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('posts', [PostController::class, 'index'])
    ->middleware('auth', 'verified')->name('posts');

Route::post('test', function (Request $request) {
    // Log::info($request);

    $category = PostCategory::create();

    Translation::create([
        'translatable_type' => PostCategory::class,
        'translatable_id' => $category->id,
        'language_code' => 'en',
        'field' => 'title',
        'translation' => $request->titleEng,
    ]);
    Translation::create([
        'translatable_type' => PostCategory::class,
        'translatable_id' => $category->id,
        'language_code' => 'lv',
        'field' => 'title',
        'translation' => $request->titleLv,
    ]);

    Translation::create([
        'translatable_type' => PostCategory::class,
        'translatable_id' => $category->id,
        'language_code' => 'en',
        'field' => 'description',
        'translation' => $request->descriptionEng,
    ]);
    Translation::create([
        'translatable_type' => PostCategory::class,
        'translatable_id' => $category->id,
        'language_code' => 'lv',
        'field' => 'description',
        'translation' => $request->descriptionLv,
    ]);

    return redirect(route('posts'));
})->name('test');

Route::get('lang/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'lv'])) {
        Session::put('locale', $locale);
        App::setLocale($locale);
    }

    return redirect()->back();
})->name('change.language');

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


// routes/web.php


Route::get('/404', function () {
    return Inertia::render('Error');  // The custom 404 page component in React
})->name('404');

// Other routes go here


function getTranslation($key, $languageCode = null)
{
    $languageCode = $languageCode ?: app()->getLocale(); // Get current locale, or fallback to 'en'

    return Translation::where('key', $key)
        ->where('language_code', $languageCode)
        ->value('translation');
}

require __DIR__.'/auth.php';
