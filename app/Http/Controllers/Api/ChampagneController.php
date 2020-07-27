<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Champagne;
use App\Models\ChampagneGrape;

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
        return $this->service->getWithGrapeSorts(new ChampagneGrape(), 'champagne_id');
    }

    /**
     * Display the specified champagne.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getWithGrapeSorts(new ChampagneGrape(), 'champagne_id', $id);
    }
}
