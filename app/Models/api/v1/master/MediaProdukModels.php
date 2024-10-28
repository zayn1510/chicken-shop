<?php

namespace App\Models\api\v1\master;

use App\Models\master\ProdukModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaProdukModels extends Model
{
    use HasFactory;
    protected $table="produk_media";
    protected $primaryKey="id";
    public $timestamps=true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
       "media_type",
       "media_url",
       "thumbnail_url",
       "produk_id"
    ];

    public function produk()
    {
        return $this->belongsTo(ProdukModel::class);
    }
}
