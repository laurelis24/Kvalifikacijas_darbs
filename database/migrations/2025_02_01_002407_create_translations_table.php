<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('translations', function (Blueprint $table) {
            $table->id();
            $table->morphs('translatable');
            $table->string('language_code', 10);
            $table->text('translation');
            $table->string('field');
            $table->timestamps();

            $table->unique(['translatable_type', 'translatable_id', 'language_code', 'field'], 'unique_translation_index');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('translations');
    }
};
