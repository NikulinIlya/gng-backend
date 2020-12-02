<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Whiskey;

class WhiskeyController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * WhiskeyController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Whiskey());
    }

    /**
     * Display a listing of whiskey.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getProductsEntitiesCollection();
    }

    /**
     * Display the specified whiskey.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getProductsEntitiesCollection($id);
    }
}
