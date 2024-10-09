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
        Schema::table('stok_masuk', function (Blueprint $table) {
            $table->addColumn("integer","jumlah")->after("jenis_ayam");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stok_masuk', function (Blueprint $table) {
            $table->dropColumn("jumlah");
        });
    }
};