<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\BrandArticle;

class BrandArticleController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * BrandArticleController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new BrandArticle());
    }

    /**
     * Display a listing of articles.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified article.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }

    /**
     * @param int $brandId
     *
     * @return \Illuminate\Support\Collection
     */
    public function showByBrand($brandId)
    {
        $brandArticle = BrandArticle::where('brand_id', $brandId)->first();

        return $this->service->makeEntityCollection([$brandArticle], app()->getLocale());
    }
}
