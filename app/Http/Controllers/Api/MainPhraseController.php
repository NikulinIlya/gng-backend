<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\MainPhrase;

class MainPhraseController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * MainPhraseController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new MainPhrase());
    }

    /**
     * Display a listing of phrases.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified phrase.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }
}
