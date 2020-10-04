<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Product;
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
     * Display the specified product with its settings.
     *
     * @param int $id
     * @return mixed
     */
    public function showProductWithSettings($id)
    {
        $product = Product::findOrFail($id);
        $productCategorySlug = $product->productCategory()->first()->slug;
        $locale = app()->getLocale();
        $productSettings = $product->$productCategorySlug()->firstOrFail();

        if ($productCategorySlug == 'wine') {
            $controller = new VineController();

            $productSettings = $controller->show($productSettings->id);
        } elseif ($productCategorySlug == 'champagne') {
            $controller = new ChampagneController();

            $productSettings = $controller->show($productSettings->id);
        } else {
            $productSettings = $this->service->makeEntityCollection([$productSettings], $locale);
        }

        $product = $this->service->makeEntityCollection([$product], $locale)[0];
        $product[$productCategorySlug] = $productSettings[0];

        return $product;
    }

    /**
     * Display only popular products.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getPopularProducts()
    {
        $locale = app()->getLocale();

        $products = ($locale === 'ru')
            ? Product::where('is_popular', 1)->get()
            : Product::withTranslations($locale)->where('is_popular', 1)->get();

        return $this->service->makeEntityCollection($products, $locale);
    }
}
