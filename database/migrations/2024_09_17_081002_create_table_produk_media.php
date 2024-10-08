<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('table_produk_media', function (Blueprint $table) {
            $table->id();
            $table->string('media_type');
            $table->string('media_url');
            $table->string('thumbnail_url')->nullable();
            $table->unsignedBigInteger('produk_id'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_produk_media');
    }
};
