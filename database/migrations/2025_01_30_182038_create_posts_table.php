<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {

        Schema::create("posts_categories", function(Blueprint $table){
            $table->id();
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()
            ->constrained('posts_categories')
            ->onDelete('restrict');
            $table->string('title');
            $table->text('description', 2000);
            $table->json("coordinates")->nullable();
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

        Schema::create('post_comments', function (Blueprint $table) {
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
        Schema::dropIfExists('posts');
        Schema::dropIfExists('posts_categories');
        Schema::dropIfExists('posts_media');
    }
};
