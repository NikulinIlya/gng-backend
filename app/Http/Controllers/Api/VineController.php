<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Vine;
use App\Models\VinesGrape;

class VineController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * VineController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Vine());
    }

    /**
     * Display a listing of vines.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getWithGrapeSorts(new VinesGrape(), 'vine_id');
    }

    /**
     * Display the specified vine.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getWithGrapeSorts(new VinesGrape(), 'vine_id', $id);
    }

    /**
     * Display a listing of vines united with related products.
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getWithProducts()
    {
        $vines = $this->service->getWithProducts();

        return $this->service->paginate($vines, 10);
    }
}
