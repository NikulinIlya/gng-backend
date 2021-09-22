<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Gin;

class GinController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * GinController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Gin());
    }

    /**
     * Display a listing of gin.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getProductsEntitiesCollection();
    }

    /**
     * Display the specified gin.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getProductsEntitiesCollection($id);
    }
}
