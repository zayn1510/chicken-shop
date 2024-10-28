<?php

namespace App\Models\master;

use App\Models\api\v1\master\MediaProdukModels;
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
        'diskon',
        'tanggal_produksi',
        'is_promo'
    ];

    public function media()
    {
        return $this->hasMany(MediaProdukModels::class, 'produk_id');
    }

    protected static function booted()
    {
        static::deleting(function ($produk) {
            $produk->media()->delete();
        });
    }

}
