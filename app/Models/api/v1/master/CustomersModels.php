<?php

namespace App\Models\api\v1\master;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomersModels extends Model
{
    protected $table = "customers";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "userid",
        "nama_lengkap",
        "phone",
        "alamat",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userid');
    }

    public function customers()
    {
        return $this->belongsTo(OrderModel::class);
    }
}
