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
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new AboutInfo());
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
     * Display the specified info.
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
