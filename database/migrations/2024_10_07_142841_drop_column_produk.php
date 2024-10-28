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
        Schema::table('produk', function (Blueprint $table) {
            $table->dropColumn("bagian_ayam");
            $table->dropColumn("tanggal_kadaluarsa");
            $table->dropColumn("sertifikat");
            $table->dropColumn("cara_pembuatan");
            $table->dropColumn("berat_rata_rata");
            $table->dropColumn("ukuran_ayam");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produk', function (Blueprint $table) {
            //
        });
    }
};
