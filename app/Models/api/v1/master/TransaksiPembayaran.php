<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiPembayaran extends Model
{
    use HasFactory;

    protected $table = "transaksi_pembayarans";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "order_id",
        "metode_id",
        "bank_id",
        "total",
        "status"
    ];

    public function orders()
    {
        return $this->hasOne(OrderModel::class, "id", "order_id");
    }

    public function metode()
    {
        return $this->hasOne(MetodeModels::class,"id","metode_id");
    }

    public function bank()
    {
        return $this->hasOne(BankModel::class,"id","bank_id");
    }

    public function konfirmasi_pembayaran()
    {
        return $this->hasMany(KonfirmasiPembayaranModel::class,"transaksi","id");
    }

}
