<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Vintage;

class VintageController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * VintageController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Vintage());
    }

    /**
     * Display a listing of vintages.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified vintage.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
