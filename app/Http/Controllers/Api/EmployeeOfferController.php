<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\EmployeeOffer;

class EmployeeOfferController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * EmployeeOfferController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new EmployeeOffer());
    }

    /**
     * Display a listing of employee offers.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified employee offer.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
