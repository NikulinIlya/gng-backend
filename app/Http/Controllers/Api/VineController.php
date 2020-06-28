<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Brand;
use App\Models\Vine;
use Illuminate\Http\Request;

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
        $vines = $this->service->index();

        $brand = Brand::find($vines[0]['brand_id'])->name;
    }

    /**
     * Display the specified vine.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        $vine = $this->service->show($id);

        $brand = Brand::find($vine[0]['brand_id'])->name;
    }
}
