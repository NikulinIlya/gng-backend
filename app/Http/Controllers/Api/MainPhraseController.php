<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\MainPhrase;
use Illuminate\Http\Request;

class MainPhraseController
{
    private $service;

    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new MainPhrase());
    }

    /**
     * Display a listing of phrases.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified phrase.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
