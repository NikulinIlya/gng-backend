<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Tequila;

class TequilaController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * TequilaController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Tequila());
    }

    /**
     * Display a listing of tequila.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getProductsEntitiesCollection();
    }

    /**
     * Display the specified tequila.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getProductsEntitiesCollection($id);
    }
}
