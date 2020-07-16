<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Event;

class EventController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * EventController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Event());
    }

    /**
     * Display a listing of events.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified event.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
