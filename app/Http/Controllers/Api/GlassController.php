<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Glass;

class GlassController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * GlassController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Glass());
    }

    /**
     * Display a listing of glasses.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified glasses.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
