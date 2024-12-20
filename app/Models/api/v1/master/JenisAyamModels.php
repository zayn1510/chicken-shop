<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisAyamModels extends Model
{
    use HasFactory;
    protected $table = "jenis_ayam";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "jenis",
        "keterangan",
        "berat",
        "harga",
        "stok",
        "diskon"
    ];

    public function stok_masuk()
    {
        return $this->hasMany(StokModels::class, 'jenis_ayam');
    }


    public function keranjang()
    {
        return $this->belongsTo(KeranjangModel::class);
    }

    public function produk_media()
    {
        return $this->hasMany(MediaProdukModels::class, "produk_id");
    }

    public function detail_order()
    {
        return $this->belongsTo(DetailOrdersModel::class);
    }
}
