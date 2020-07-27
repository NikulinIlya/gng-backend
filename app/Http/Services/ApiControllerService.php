<?php

namespace App\Http\Services;

use App\Models\GrapeSort;
use Illuminate\Database\Eloquent\Model;

class ApiControllerService
{
    /**
     * @var Model|null
     */
    private $model;

    /**
     * ApiControllerService constructor.
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
     * @return mixed
     */
    public function show($id)
    {
        return $this->getEntitiesCollection($this->model, $id);
    }

    /**
     * Get drink entities with set grape sorts field.
     *
     * @param Model $grapesPivotModel
     * @param int $idName
     * @param int|null $drink_id
     * @return array
     */
    public function getWithGrapeSorts($grapesPivotModel, $idName, $drink_id = null)
    {
        $entities = $this->getEntitiesCollection($this->model, $drink_id);

        $newEntities = [];
        foreach ($entities as $entity) {
            $grapeSorts = $grapesPivotModel::where($idName, $entity['id'])->get();

            $grapeSortsIds = [];
            foreach ($grapeSorts as $grapeSort) {
                $grapeSortsIds[] = $grapeSort->grape_sort_id;
            }

            $drinkGrapeSorts = $this->makeEntityCollection(GrapeSort::whereIn('id', $grapeSortsIds)->get(),
                app()->getLocale());

            $entity['grape_sorts'] = $drinkGrapeSorts;
            $newEntities[] = $entity;
        }

        return $newEntities;
    }
    /**
     * Display the specified entity with set content fields.
     *
     * @param Model $model
     * @param int|null $id
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
     * Get only translated values from entity.
     *
     * @param Model $entity
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
     * @param Model[] $entities
     * @param string $locale
     * @return \Illuminate\Support\Collection
     */
    public function makeEntityCollection($entities, $locale)
    {
        $resultCollection = collect();

        foreach ($entities as $entity) {
            $this->setImageField($entity);

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
     * Set image field of the entity.
     *
     * @param Model $entity
     */
    public function setImageField(&$entity)
    {
        if (isset($entity['main_image'])) {
            $entity['main_image'] = str_replace('\\', '/', '/storage/'.$entity['main_image']);
        }

        if (isset($entity['image'])) {
            $entity['image'] = str_replace('\\', '/', '/storage/'.$entity['image']);
        }

        if (isset($entity['glass_image'])) {
            $entity['glass_image'] = str_replace('\\', '/', '/storage/'.$entity['glass_image']);
        }

        if (isset($entity['map_image'])) {
            $entity['map_image'] = str_replace('\\', '/', '/storage/'.$entity['map_image']);
        }

        if (isset($entity['images'])) {
            $images = explode(',', str_replace('\\\\', '/', str_replace(['[', ']', '"'], '', $entity['images'])));

            foreach ($images as &$image) {
                $image = '/storage/'.$image;
            }

            $entity['images'] = $images;
        }
    }
}
