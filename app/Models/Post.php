<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'title',
        'description',
        'coordinates',
    ];

    protected $casts = [
        'coordinates' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(PostCategory::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function media()
    {
        return $this->hasMany(PostMedia::class, 'post_id');
    }

    public function randomMedia()
    {
        return $this->hasOne(PostMedia::class, 'post_id')->inRandomOrder();
    }
}
