<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Cognac;

class CognacController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * CognacController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Cognac());
    }

    /**
     * Display a listing of cognac.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getProductsEntitiesCollection();
    }

    /**
     * Display the specified cognac.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getProductsEntitiesCollection($id);
    }
}
