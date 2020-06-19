<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\AssistantPhrase;
use Illuminate\Http\Request;

class AssistantPhraseController
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
        $this->service = new ApiControllerService($request->language, new AssistantPhrase());
    }

    /**
     * Display a listing of assistant phrases.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified assistant phrase.
     *
     * @param string $language
     * @param int $id
     * @return mixed
     */
    public function show($language, $id)
    {
        return $this->service->show($id);
    }

    /**
     * Display the specified assistant phrase by its assistant.
     *
     * @param string $language
     * @param int $assistantId
     * @return mixed
     */
    public function getByAssistant($language, $assistantId)
    {
        return \App\Models\Assistant::withTranslations($language)->find($assistantId)->assistantPhrases;
    }
}
