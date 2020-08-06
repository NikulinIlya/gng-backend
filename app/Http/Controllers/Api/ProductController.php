<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductController
{
    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new Product());
    }

    /**
     * Display a listing of products.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified product.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Display a listing of products searched by query.
     *
     * @param Request $request
     * @return \Illuminate\Support\Collection|mixed
     */
    public function search(Request $request)
    {
        $request->validate([
            'query' => 'required|min:1',
        ]);

        $query = $request->input('query');

        if (strlen($query) < 3) {
            return $this->service->index();
        }

        $products = Product::search($query)->get();

        return $this->service->makeEntityCollection($products, app()->getLocale());
    }

    /**
     * Display a listing of products sorted by category.
     *
     * @param $categorySlug
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getProductsByCategory($categorySlug)
    {
        $products = ProductCategory::where('slug', $categorySlug)->firstOrFail()->products;

        $products = $this->service->makeEntityCollection($products, app()->getLocale());

        return $this->service->paginate($products, 10);
    }
}
