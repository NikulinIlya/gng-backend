<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\AssistantPhrase;

class AssistantPhraseController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * AssistantPhraseController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new AssistantPhrase());
    }

    /**
     * Display a listing of assistant phrases.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->getEntitiesCollection();
    }

    /**
     * Display the specified assistant phrase.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->getEntitiesCollection($id);
    }

    /**
     * Display the specified assistant phrase by its brand.
     *
     * @param int $brandId
     * @return mixed
     */
    public function getByBrand($brandId)
    {
        return $this->service->getEntitiesCollection()->where('brand_id', $brandId);
    }
}
