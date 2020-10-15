<?php

namespace App\Http\Services;

use App\Models\Brand;
use App\Models\Champagne;
use App\Models\GrapeSort;
use App\Models\Liquor;
use App\Models\Location;
use App\Models\Product;
use App\Models\Vine;
use App\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class ApiControllerService
{
    /**
     * @var Model|null
     */
    private $model;

    /**
     * ApiControllerService constructor.
     *
     * @param Model|null $model
     */
    public function __construct($model = null)
    {
        $this->model = $model;
    }

    /**
     * Display a listing of entities.
     *
     * @return mixed
     */
    public function index()
    {
        return $this->getEntitiesCollection($this->model);
    }

    /**
     * Display the specified entity with set content fields.
     *
     * @param int $id
     *
     * @return mixed
     */
    public function show($id)
    {
        return $this->getEntitiesCollection($this->model, $id);
    }

    /**
     * Get drink entities with set grape sorts field.
     *
     * @param Model    $grapesPivotModel
     * @param int      $idName
     * @param int|null $drinkId
     *
     * @return array
     */
    public function getWithGrapeSorts($grapesPivotModel, $idName, $drinkId = null)
    {
        $entities = $this->getEntitiesCollection($this->model, $drinkId);

        $newEntities = [];
        foreach ($entities as $entity) {
            $grapeSorts = $grapesPivotModel::where($idName, $entity['id'])->get();

            $grapeSortsIds = [];
            foreach ($grapeSorts as $grapeSort) {
                $grapeSortsIds[] = $grapeSort->grape_sort_id;
            }

            $drinkGrapeSorts = $this->makeEntityCollection(
                GrapeSort::whereIn('id', $grapeSortsIds)->get(),
                app()->getLocale()
            );

            $entity['grape_sorts'] = $drinkGrapeSorts;
            $newEntities[] = $entity;
        }

        return $newEntities;
    }

    /**
     * Display the specified entity with set content fields.
     *
     * @param Model    $model
     * @param int|null $id
     *
     * @return mixed
     */
    protected function getEntitiesCollection($model, $id = null)
    {
        $locale = app()->getLocale();

        if (isset($id)) {
            $entity = ($locale === 'ru')
                ? $model::findOrFail($id)
                : $model::withTranslations($locale)->findOrFail($id);

            $entities = [$entity];
        } else {
            $entities = ($locale === 'ru')
                ? $this->model::all()
                : $this->model::withTranslations($locale)->get();
        }

        return $this->makeEntityCollection($entities, $locale);
    }

    /**
     * Unite drink entities with related products.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getWithProducts()
    {
        $drinks = $this->model::all();

        $locale = app()->getLocale();

        foreach ($drinks as &$drink) {
            $product = $drink->product()->get();
            $drink['product'] = $this->makeEntityCollection($product, $locale)[0];
        }

        return $this->makeEntityCollection($drinks, $locale);
    }

    /**
     * Get only translated values from entity.
     *
     * @param Model $entity
     *
     * @return array
     */
    public function getTranslatedFields($entity)
    {
        $resultArray = [];

        foreach ($entity['translations'] as $translation) {
            $resultArray[$translation['column_name']] = $translation['value'];
        }

        return $resultArray;
    }

    /**
     * Make return entities collection to a special format.
     *
     * @param \Illuminate\Support\Collection|array $entities
     * @param string                               $locale
     *
     * @return \Illuminate\Support\Collection
     */
    public function makeEntityCollection($entities, $locale)
    {
        $resultCollection = collect();

        foreach ($entities as $entity) {
            $this->setImageField($entity);

            // добавляется доп поле quantity пока нет данных
            if (get_class($this->model) == 'App\Models\Product') {
                $service = new ProductStockService();
                $entity['quantity'] = $service->getProductAvailableQuantity($entity->id);
            }

            $collection = $entity->toArray();
            unset($collection['created_at'], $collection['updated_at']);

            if ($locale !== 'ru') {
                unset($collection['translations']);
                $collection = array_merge($collection, $this->getTranslatedFields($entity));
            }

            $resultCollection = $resultCollection->concat([$collection]);
        }

        return $resultCollection;
    }

    /**
     * @param string $categorySlug
     *
     * @return array
     */
    public function getFilters($categorySlug)
    {
        $filters = [];

        $products = $this->model::where('slug', $categorySlug)->firstOrFail()->products;

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

        $filters['brands'] = $this->makeEntityCollection($brands, $locale);
        $filters['locations'] = $this->makeEntityCollection(Location::find($locations), $locale);

        if ($hasColours) {
            $filters['colours'] = $this->makeEntityCollection($colours, $locale);
        }

        if ($hasGrapes) {
            $filters['grape_sorts'] = $this->makeEntityCollection($grapeSortsUnique, $locale);
        }

        return $filters;
    }

    /**
     * @param Request $request
     * @param array   $productCategoriesId
     * @param array   $productCategoriesSlug
     *
     * @return \Illuminate\Support\Collection
     */
    public function getProductsEntities(Request $request, $productCategoriesId, $productCategoriesSlug)
    {
        $filters = $this->combineFiltersArray($request);

        $products = Product::whereIn('product_category_id', $productCategoriesId)
                           ->where(
                               function ($query) use ($filters) {
                                   if ($filters['brands']) {
                                       $query->whereIn('brand_id', $filters['brands']);
                                   }
                               }
                           )
                           ->where(
                               function ($query) use ($filters) {
                                   if ($filters['locations']) {
                                       $brandsId = Brand::whereIn('location_id', $filters['locations'])->get()->map(
                                           function ($brand) {
                                               return $brand->id;
                                           }
                                       );

                                       $query->whereIn('brand_id', $brandsId);
                                   }
                               }
                           )
                           ->whereBetween('price', [$filters['price_min'], $filters['price_max']])
                           ->where(
                               function ($query) use ($filters, $productCategoriesSlug) {
                                   if ($filters['colours']) {
                                       $productsId = [];

                                       foreach ($productCategoriesSlug as $productCategory) {
                                           switch ($productCategory) {
                                               case 'wine':
                                                   $model = new Vine();
                                                   break;
                                               case 'champagne':
                                                   $model = new Champagne();
                                                   break;
                                               case 'liquor':
                                                   $model = new Liquor();
                                                   break;
                                               default:
                                                   $model = null;
                                                   break;
                                           }

                                           if ($model) {
                                               $entityProductId =
                                                   $model::whereIn('colour_id', $filters['colours'])->get()->map(
                                                       function ($entity) {
                                                           return $entity->product_id;
                                                       }
                                                   );

                                               $productsId = array_merge($productsId, $entityProductId->toArray());
                                           }
                                       }

                                       $productsId = array_unique($productsId);

                                       $query->whereIn('id', $productsId);
                                   }
                               }
                           )
                           ->where(
                               function ($query) use ($filters, $productCategoriesSlug) {
                                   if ($filters['grape_sorts']) {
                                       $grapeSorts = GrapeSort::find($filters['grape_sorts']);

                                       if ($grapeSorts) {
                                           $productsId = [];

                                           foreach ($productCategoriesSlug as $productCategory) {
                                               switch ($productCategory) {
                                                   case 'wine':
                                                       foreach ($grapeSorts as $grapeSort) {
                                                           $entityIds = $grapeSort->vines->map(
                                                               function ($entity) {
                                                                   return $entity->product_id;
                                                               }
                                                           );

                                                           $productsId =
                                                               array_merge($productsId, $entityIds->toArray());
                                                       }

                                                       break;
                                                   case 'champagne':
                                                       foreach ($grapeSorts as $grapeSort) {
                                                           $entityIds = $grapeSort->champagne->map(
                                                               function ($entity) {
                                                                   return $entity->product_id;
                                                               }
                                                           );

                                                           $productsId =
                                                               array_merge($productsId, $entityIds->toArray());
                                                       }

                                                       break;
                                                   default:
                                                       break;
                                               }
                                           }

                                           $productsId = array_unique($productsId);

                                           $query->whereIn('id', $productsId);
                                       }
                                   }
                               }
                           )
                           ->where(
                               function ($query) use ($filters, $productCategoriesSlug) {
                                   if (
                                       ! empty($productCategoriesSlug)
                                       && $productCategoriesSlug[0] === 'wine'
                                       && $filters['sweetness']
                                   ) {
                                       $productIds = Vine::whereIn('sweetness', $filters['sweetness'])->get()->map(
                                           function ($entity) {
                                               return $entity->product_id;
                                           }
                                       );

                                       $query->whereIn('id', $productIds);
                                   }
                               }
                           )
                           ->where(
                               function ($query) use ($filters, $productCategoriesSlug) {
                                   if (
                                       ! empty($productCategoriesSlug)
                                       && $productCategoriesSlug[0] === 'wine'
                                       && $filters['body']
                                   ) {
                                       $productIds = Vine::whereIn('body', $filters['body'])->get()->map(
                                           function ($entity) {
                                               return $entity->product_id;
                                           }
                                       );

                                       $query->whereIn('id', $productIds);
                                   }
                               }
                           )
                           ->where(
                               function ($query) use ($filters, $productCategoriesSlug) {
                                   if (
                                       ! empty($productCategoriesSlug)
                                       && $productCategoriesSlug[0] === 'wine'
                                       && $filters['acidity']
                                   ) {
                                       $productIds = Vine::whereIn('acidity', $filters['acidity'])->get()->map(
                                           function ($entity) {
                                               return $entity->product_id;
                                           }
                                       );

                                       $query->whereIn('id', $productIds);
                                   }
                               }
                           )
                           ->orderBy('brand_id')
                           ->get();

        return $this->makeEntityCollection($products, app()->getLocale());
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    public function combineFiltersArray(Request $request)
    {
        return [
            'brands'      => $request->input('brands'),
            'locations'   => $request->input('locations'),
            'price_min'   => $request->input('price_min') ?? 0,
            'price_max'   => $request->input('price_max') ?? 1000000,
            'colours'     => $request->input('colours'),
            'grape_sorts' => $request->input('grape_sorts'),
            'sweetness'   => $request->input('sweetness') ? $this->setNumFilterInterval($request->input('sweetness'), 1, 5)
                : null,
            'body'        => $request->input('body') ? $this->setNumFilterInterval($request->input('body'), 1, 5) : null,
            'acidity'     => $request->input('acidity') ? $this->setNumFilterInterval($request->input('acidity'), 1, 5)
                : null,
        ];
    }

    /**
     * Set image field of the entity.
     *
     * @param Model $entity
     */
    public function setImageField(&$entity)
    {
        if (isset($entity['main_image'])) {
            $entity['main_image'] = str_replace('\\', '/', '/storage/' . $entity['main_image']);
        }

        if (isset($entity['image'])) {
            $entity['image'] = str_replace('\\', '/', '/storage/' . $entity['image']);
        }

        if (isset($entity['glass_image'])) {
            $entity['glass_image'] = str_replace('\\', '/', '/storage/' . $entity['glass_image']);
        }

        if (isset($entity['map_image'])) {
            $entity['map_image'] = str_replace('\\', '/', '/storage/' . $entity['map_image']);
        }

        if (isset($entity['images'])) {
            $images = explode(',', str_replace('\\\\', '/', str_replace(['[', ']', '"'], '', $entity['images'])));

            foreach ($images as &$image) {
                $image = '/storage/' . $image;
            }

            $entity['images'] = $images;
        }
    }

    /**
     * Paginate entities.
     *
     * @param \Illuminate\Support\Collection|array $entities
     * @param int                                  $perPage
     *
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function paginate($entities, $perPage)
    {
        $productsCollection = new Collection();

        foreach ($entities as $entity) {
            $productsCollection->push($entity);
        }

        return $productsCollection->paginate($perPage);
    }

    /**
     * @param int $filterValue
     * @param int $minValue
     * @param int $maxValue
     *
     * @return array
     */
    public function setNumFilterInterval($filterValue, $minValue, $maxValue)
    {
        return range(
            $filterValue == $minValue ? $filterValue : $filterValue - 1,
            $filterValue == $maxValue ? $filterValue : $filterValue + 1
        );
    }
}
