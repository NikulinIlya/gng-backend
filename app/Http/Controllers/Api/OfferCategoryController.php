<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\OfferCategory;

class OfferCategoryController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * OfferCategoryController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new OfferCategory());
    }

    /**
     * Display a listing of offer categories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified offer category.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
