<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class PostCategory extends Model
{
    use HasFactory;

    protected $table = 'posts_categories';

    protected $fillable = [
        'title',
        'description',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }


    public function translations(): MorphMany
    {
        return $this->morphMany(Translation::class, 'translatable');
    }

    public function getTranslation($field, $languageCode = null)
    {

        $languageCode = $languageCode ?: Session::get("locale");

       
        $translation = $this->translations()
            ->where('translatable_id', $this->id)
            ->where('field', $field)
            ->where('language_code', $languageCode)
            ->first();

            Log::info($translation->translation);

        return $translation ? $translation->translation : null;
    }
}
