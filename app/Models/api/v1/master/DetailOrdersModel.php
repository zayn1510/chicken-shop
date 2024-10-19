<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailOrdersModel extends Model
{
    use HasFactory;

    protected $table = "order_details";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "order_id",
        "ayam",
        "jumlah",
        "harga",
    ];

    public function orders()
    {
        return $this->belongsTo(OrderModel::class);
    }

    public function ayam()
    {
        return $this->hasOne(JenisAyamModels::class,"id","ayam");
    }
}