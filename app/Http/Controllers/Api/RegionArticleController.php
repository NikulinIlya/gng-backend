<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\RegionArticle;

class RegionArticleController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * RegionArticleController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new RegionArticle());
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
     * @param int $locationId
     *
     * @return \Illuminate\Support\Collection
     */
    public function showByLocation($locationId)
    {
        $regionArticle = RegionArticle::where('location_id', $locationId)->first();

        return $this->service->makeEntityCollection([$regionArticle], app()->getLocale());
    }
}
