<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory;

    protected $table = "orders";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "user_id",
        "total",
        "status",
        "nomor_order"
    ];

    public function order_details()
    {
        return $this->hasMany(DetailOrdersModel::class, "order_id");
    }

    public function transaksi_pembayaran()
    {
        return $this->belongsTo(TransaksiPembayaran::class);
    }
}
