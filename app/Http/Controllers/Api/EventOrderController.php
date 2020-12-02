<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\EventOrder;

class EventOrderController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * EventOrderController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new EventOrder());
    }

    /**
     * Display a listing of event orders.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified event order.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
