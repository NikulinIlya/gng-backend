<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\GiftIdea;

class GiftIdeaController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * GiftIdeaController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new GiftIdea());
    }

    /**
     * Display a listing of gift ideas.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified gift idea.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
