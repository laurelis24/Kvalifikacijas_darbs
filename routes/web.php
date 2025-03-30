<?php

use App\Http\Controllers\LanguageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\PostCategory;
use App\Models\Translation;
use App\Roles;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::get('/', [PostController::class, 'index']);

/* Route::post('test', function (Request $request) {
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

    return back();
})->name('test'); */

Route::get('lang/{locale}', [LanguageController::class, 'switchLanguage']);

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

// routes/web.php

// Other routes go here

/*
function getTranslation($key, $languageCode = null)
{
    $languageCode = $languageCode ?: app()->getLocale(); // Get current locale, or fallback to 'en'

    return Translation::where('key', $key)
        ->where('language_code', $languageCode)
        ->value('translation');
}
*/
require __DIR__.'/auth.php';
