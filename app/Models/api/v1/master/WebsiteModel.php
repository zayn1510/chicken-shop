<?php

namespace App\Models\api\v1\master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteModel extends Model
{
    use HasFactory;
    protected $table = "profiles";
    protected $primaryKey = "id";
    public $timestamps = true;
    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';
    use HasFactory;
    protected $fillable = [
       "name",
       "description",
       "adress",
       "phone",
       "website",
       "email",
       "logo",
       "image"
    ];
}
