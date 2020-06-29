<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Brand;
use App\Models\Champagne;

class ChampagneController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ChampagneController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Champagne());
    }

    /**
     * Display a listing of champagnes.
     *
     * @return mixed
     */
    public function index()
    {
        $champs = $this->service->index();
    }

    /**
     * Display the specified champagne.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        $champ = $this->service->show($id);
    }
}
