<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Product;

class ProductController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Product());
    }

    /**
     * Display a listing of products.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified product.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
