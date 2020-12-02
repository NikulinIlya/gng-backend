<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Promotion;

class PromotionController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * PromotionController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Promotion());
    }

    /**
     * Display a listing of promotions.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified promotion.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
