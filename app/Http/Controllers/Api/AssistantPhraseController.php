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
        return $this->service->index();
    }

    /**
     * Display the specified assistant phrase.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Display the specified assistant phrase by its assistant.
     *
     * @param int $assistantId
     * @return mixed
     */
    public function getByAssistant($assistantId)
    {
        return $this->service->index()->where('assistant_id', $assistantId);
    }
}
