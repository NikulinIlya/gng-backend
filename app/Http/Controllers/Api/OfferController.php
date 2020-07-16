<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Offer;

class OfferController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * OfferController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Offer());
    }

    /**
     * Display a listing of offers.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified offer.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
