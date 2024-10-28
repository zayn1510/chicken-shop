<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankModel extends Model
{
    use HasFactory;
    protected $table = "bank";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
        "nama_bank",
        "nomor_rekening",
        "atas_nama"
    ];
    public function transaksi_pembayarans()
    {
        return $this->belongsTo(TransaksiPembayaran::class);
    }
    
}
