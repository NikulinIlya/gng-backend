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
        return $this->service->index();
    }

    /**
     * Display the specified article.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
