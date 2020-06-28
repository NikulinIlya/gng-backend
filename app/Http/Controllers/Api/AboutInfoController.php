<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\AboutInfo;
use Illuminate\Http\Request;

class AboutInfoController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * AboutInfoController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new AboutInfo());
    }

    /**
     * Display a listing of about infos.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified about info.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }
}
