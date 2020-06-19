<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Accessory;
use Illuminate\Http\Request;

class AccessoryController
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
        $this->service = new ApiControllerService($request->language, new Accessory());
    }

    /**
     * Display a listing of accessories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified accessory.
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
