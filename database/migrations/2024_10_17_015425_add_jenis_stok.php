<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('stok_ayam', function (Blueprint $table) {
            $table->integer("jenis_stok")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stok_ayam', function (Blueprint $table) {
            $table->dropColumn("jenis_stok");
        });
    }
};
