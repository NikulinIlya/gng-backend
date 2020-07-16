<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Kit;

class KitController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * KitController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Kit());
    }

    /**
     * Display a listing of kits.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified kit.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
