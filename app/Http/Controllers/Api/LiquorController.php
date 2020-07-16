<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Liquor;

class LiquorController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * LiquorController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Liquor());
    }

    /**
     * Display a listing of liquors.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified liquor.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
