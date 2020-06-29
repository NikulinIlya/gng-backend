<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Location;

class LocationController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * LocationController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Location());
    }

    /**
     * Display a listing of locations.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified location.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
