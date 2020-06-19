<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\DrinkType;
use Illuminate\Http\Request;

class DrinkTypeController
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
    }

    /**
     * Display a listing of drink types.
     *
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        $service = new ApiControllerService($request->language, new DrinkType());
        return $service->index();
    }

    /**
     * Display the specified drink type.
     *
     * @param string $language
     * @param string $slug
     * @return mixed
     */
    public function show($language, $slug)
    {
        return DrinkType::where('slug', $slug)->firstOrFail();
    }
}
