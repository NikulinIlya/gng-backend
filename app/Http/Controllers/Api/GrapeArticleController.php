<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\GrapeArticle;

class GrapeArticleController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * GrapeArticleController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new GrapeArticle());
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
     * @param int $grapeId
     *
     * @return \Illuminate\Support\Collection
     */
    public function showByGrape($grapeId)
    {
        $grapeArticle = GrapeArticle::where('grape_sort_id', $grapeId)->first();

        return $this->service->makeEntityCollection([$grapeArticle], app()->getLocale());
    }
}
