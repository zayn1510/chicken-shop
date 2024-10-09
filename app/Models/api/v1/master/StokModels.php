<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StokModels extends Model
{
    use HasFactory;
    protected $table="stok_masuk";
    protected $primaryKey="id";
    public $timestamps=true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
       "jenis_ayam",
       "jumlah",
       "tanggal_masuk"
    ];
}
