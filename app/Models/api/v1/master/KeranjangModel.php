<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeranjangModel extends Model
{
    use HasFactory;
    protected $table = "keranjang";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "ayam",
        "jumlah",
        "user_id"
    ];

    public function jenis_ayam()
    {
        return $this->hasOne(JenisAyamModels::class, "id","ayam");
    }
}
