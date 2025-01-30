<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostMedia extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'media_type',
        'file_path',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
