<?php

namespace App\Models\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdukModel extends Model
{
    protected $table="produk";
    protected $primaryKey="id";
    public $timestamps=true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        'nama_produk',
        'deskripsi',
        'harga',
        'stok',
        'berat_rata_rata',
        'ukuran_ayam',
        'bagian_ayam',
        'tanggal_masuk',
        'tanggal_kadaluarsa',
        'umur_ayam',
        'cara_pembuatan',
        'sertifikat',
        'diskon',
        'rak',
        'tanggal_produksi',
        'is_promo'
    ];

    
    protected $casts = [
        'tanggal_masuk' => 'date',
        'tanggal_kadaluarsa' => 'date',
    ];
}
