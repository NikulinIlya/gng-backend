<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Vodka;

class VodkaController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * VintageController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Vodka());
    }

    /**
     * Display a listing of vodkas.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getProductsEntitiesCollection();
    }

    /**
     * Display the specified vodka.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getProductsEntitiesCollection($id);
    }
}
