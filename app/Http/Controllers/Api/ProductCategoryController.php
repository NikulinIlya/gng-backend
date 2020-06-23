<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductCategoryController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new ProductCategory());
    }

    /**
     * Display a listing of product categories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified product category.
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
