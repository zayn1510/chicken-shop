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
        Schema::create('produk', function (Blueprint $table) {
            $table->id();
            $table->string('nama_produk',100);
            $table->text('deskripsi')->nullable();
            $table->decimal('harga', 10, 2);
            $table->integer('stok');
            $table->decimal('berat_rata_rata', 5, 2)->nullable();
            $table->enum('ukuran_ayam', ['kecil', 'sedang', 'besar'])->nullable();
            $table->enum('bagian_ayam', ['utuh', 'dada', 'paha', 'sayap'])->nullable();
            $table->date('tanggal_masuk');
            $table->date('tanggal_kadaluarsa');
            $table->string('umur_ayam',30);
            $table->enum('cara_pembuatan', ['fresh chilled', 'frozen', 'olahan']);
            $table->string('sertifikat', 100)->nullable();
            $table->decimal('diskon', 5, 2)->default(0);
            $table->date('tanggal_produksi');
            $table->boolean('is_promo')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk');
    }
};
