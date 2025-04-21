<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PostCategory extends Model
{
    use HasFactory;

    protected $table = 'posts_categories';

    protected $fillable = [
        'title',
        'description',
        'color',
    ];

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
