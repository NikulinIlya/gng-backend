<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Brand;

class BrandController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * BrandController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Brand());
    }

    /**
     * Display a listing of brands.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified brand.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
