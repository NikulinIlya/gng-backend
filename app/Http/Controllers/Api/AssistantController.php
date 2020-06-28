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
     * AssistantController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Assistant());
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
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
