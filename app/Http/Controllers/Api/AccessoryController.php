<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Accessory;

class AccessoryController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * AccessoryController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Accessory());
    }

    /**
     * Display a listing of accessories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified accessory.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
