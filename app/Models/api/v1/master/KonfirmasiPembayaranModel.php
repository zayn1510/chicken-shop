<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KonfirmasiPembayaranModel extends Model
{
    use HasFactory;
    use HasFactory;
    protected $table="konfirmasi_pembayaran";
    protected $primaryKey="id";
    public $timestamps=true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
       "transaksi",
       "foto_pembayaran",
       "status",
    ];

    public function transaksi_pembayaran()
    {
        return $this->belongsTo(TransaksiPembayaran::class);
    }

}
