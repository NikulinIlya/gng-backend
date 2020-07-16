<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Colour;

class ColourController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ColourController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Colour());
    }

    /**
     * Display a listing of colours.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified colour.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
