<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new Product());
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
     * @param string $language
     * @param int $id
     * @return mixed
     */
    public function show($language, $id)
    {
        return $this->service->show($id);
    }
}
