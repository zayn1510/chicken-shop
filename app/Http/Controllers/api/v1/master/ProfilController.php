<?php

namespace App\Http\Controllers\api\v1\master;

use App\Http\Controllers\Controller;
use App\Http\Requests\api\v1\master\ProfilRequest;
use App\Services\api\ProfilServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfilController extends Controller
{
    protected ProfilServices $profil;

    function __construct(ProfilServices $profilServices)
    {
        $this->profil=$profilServices;
    }

    function updateProfilWebsite(ProfilRequest $profilRequest):JsonResponse
    {
        return $this->profil->updateProfiles($profilRequest);
    }
}
