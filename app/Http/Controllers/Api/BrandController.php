<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * BrandController constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->service = new ApiControllerService($request->language, new Brand());
    }

    /**
     * Display a listing of brands.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified brand.
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
