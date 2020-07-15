<?php

namespace App\Http\Services;

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
        $locale = app()->getLocale();

        $entities = ($locale === 'ru')
            ? $this->model::all()
            : $this->model::withTranslations($locale)->get();

        return $this->makeEntityCollection($entities, $locale);
    }

    /**
     * Display the specified entity with set content fields.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        $locale = app()->getLocale();

        $entity = ($locale === 'ru')
            ? $this->model::findOrFail($id)
            : $this->model::withTranslations($locale)->findOrFail($id);

        return $this->makeEntityCollection([$entity], $locale);
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

        if (isset($entity['images'])) {
            $images = explode(',', str_replace('\\\\', '/', str_replace(['[', ']', '"'], '', $entity['images'])));

            foreach ($images as &$image) {
                $image = '/storage/'.$image;
            }

            $entity['images'] = $images;
        }
    }
}
