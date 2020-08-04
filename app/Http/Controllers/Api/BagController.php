<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Bag;

class BagController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * BagController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Bag());
    }

    /**
     * Display a listing of bags.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified bags.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
