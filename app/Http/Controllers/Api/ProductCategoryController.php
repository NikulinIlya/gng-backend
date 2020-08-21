<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ApiControllerService;
use App\Models\Location;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController
{
    const STRONG_DRINKS = ['cognac', 'liquor', 'whiskey', 'vodka'];

    /**
     * @var ApiControllerService
     */
    private $service;

    /**
     * ProductCategoryController constructor.
     */
    public function __construct()
    {
        $this->service = new ApiControllerService(new ProductCategory());
    }

    /**
     * Display a listing of product categories.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Display the specified product category.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Display a listing of products sorted by category.
     *
     * @param Request $request
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getProductsByCategory(Request $request)
    {

        $products = $this->service->getProductsEntities($request->categorySlug, $request);

        return $this->service->paginate($products, 10);
    }

    /**
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getStrongDrinks()
    {
        $strongProducts = [];

        foreach (self::STRONG_DRINKS as $strongDrinksName) {
            $drinks = $this->service->getProductsEntities($strongDrinksName);

            foreach ($drinks as $item) {
                $strongProducts[] = $item;
            }
        }

        return $this->service->paginate($strongProducts, 10);
    }

    /**
     * Get all unique filters for the needed product category.
     *
     * @param string $categorySlug
     * @return array
     */
    public function getFilters($categorySlug)
    {
        $filters = [];

        $products = ProductCategory::where('slug', $categorySlug)->firstOrFail()->products;

        $brands = [];
        $locations = [];
        $hasColours = false;
        $hasGrapes = false;

        if (in_array($categorySlug, ['wine', 'champagne', 'liquor'])) {
            $colours = [];
            $hasColours = true;
        }

        if (in_array($categorySlug, ['wine', 'champagne'])) {
            $grapeSortsUnique = [];
            $hasGrapes = true;
        }
        foreach ($products as $product) {
            if (! in_array($brand = $product->brand, $brands)) {
                $brands[] = $brand;
                if (! in_array($locationId = $brand->location_id, $locations)) {
                    $locations[] = $locationId;
                }
            }
            $entity = $product->$categorySlug()->first();

            if ($entity && $hasColours && ! in_array($colour = $entity->colour, $colours)) {
                $colours[] = $colour;
            }

            if ($entity && $hasGrapes) {
                $grapeSorts = $entity->grapeSorts;
                foreach ($grapeSorts as $grapeSort) {
                    if (! array_key_exists($grapeSort->id, $grapeSortsUnique)) {
                        $grapeSortsUnique[$grapeSort->id] = $grapeSort;
                    }
                }
            }
        }

        $locale = app()->getLocale();

        $filters['brands'] = $this->service->makeEntityCollection($brands, $locale);
        $filters['locations'] = $this->service->makeEntityCollection(Location::find($locations), $locale);

        if ($hasColours) {
            $filters['colours'] = $this->service->makeEntityCollection($colours, $locale);
        }

        if ($hasGrapes) {
            $filters['grape_sorts'] = $this->service->makeEntityCollection($grapeSortsUnique, $locale);
        }

        return $filters;
    }

    /**
     * Get all filters.
     *
     * @return array
     */
    public function getStrongDrinksFilters()
    {
        $filters = [];

        foreach (self::STRONG_DRINKS as $drink) {
            $filter = $this->getFilters($drink);

            foreach ($filter['brands'] as $brand) {
                $filters['brands'][] = $brand;
            }

            foreach ($filter['locations'] as $location) {
                $filters['locations'][] = $location;
            }

            if (array_key_exists('colours', $filter)) {
                foreach ($filter['colours'] as $colour) {
                    $filters['colours'][] = $colour;
                }
            }
        }

        return $filters;
    }
}
