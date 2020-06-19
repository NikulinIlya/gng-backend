<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Assistant;
use Illuminate\Http\Request;

class AssistantController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * MainPhraseController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new Assistant());
    }

    /**
     * Display a listing of assistants.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified assistant.
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
