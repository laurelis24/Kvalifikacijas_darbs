<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {

        Schema::create('posts_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->unique();
            $table->string('description', 1000);
            $table->string('color', 7)->unique();
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                ->constrained('posts_categories')
                ->onDelete('restrict');
            $table->string('title');
            $table->json('description')->nullable();
            $table->json('coordinates')->nullable();
            $table->timestamps();
        });

        Schema::create('posts_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')
                ->constrained('posts')
                ->onDelete('cascade');
            $table->enum('media_type', ['image', 'video']);
            $table->string('file_path');
            $table->timestamps();
        });

        Schema::create('posts_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('post_id')
                ->constrained('posts')
                ->onDelete('cascade');
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->string('comment', 500);
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('posts_media');
        Schema::dropIfExists('posts_comments');
        Schema::dropIfExists('posts');
        Schema::dropIfExists('posts_categories');
    }
};
