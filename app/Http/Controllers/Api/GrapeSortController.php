<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\GrapeSort;

class GrapeSortController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * GrapeSortController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new GrapeSort());
    }

    /**
     * Display a listing of grape sorts.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified grape sort.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
