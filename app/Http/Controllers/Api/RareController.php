<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Rare;

class RareController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * RareController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Rare());
    }

    /**
     * Display a listing of rares.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified rare.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
