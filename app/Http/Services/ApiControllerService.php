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
     * @var string
     */
    private $language;

    /**
     * ApiControllerService constructor.
     * @param string $language
     * @param Model|null $model
     */
    public function __construct($language, $model = null)
    {
        $this->language = $language;
        $this->model = $model;
    }

    /**
     * Display a listing of entities.
     *
     * @return mixed
     */
    public function index()
    {
        $entities = ($this->language === 'ru')
            ? $this->model::all()
            : $this->model::withTranslations($this->language)->get();

        return $this->makeEntityCollection($entities);
    }

    /**
     * Display the specified entity with set content fields.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        $entity = ($this->language === 'ru')
            ? $this->model::findOrFail($id)
            : $this->model::withTranslations($this->language)->findOrFail($id);

        return $this->makeEntityCollection([$entity]);
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
     * @return \Illuminate\Support\Collection
     */
    public function makeEntityCollection($entities)
    {
        $resultCollection = collect();

        foreach ($entities as $entity) {
            $collection = $entity->toArray();
            unset($collection['created_at'], $collection['updated_at']);

            if ($this->language !== 'ru') {
                unset($collection['translations']);
                $collection = array_merge($collection, $this->getTranslatedFields($entity));
            }

            $resultCollection = $resultCollection->concat([$collection]);
        }

        return $resultCollection;
    }
}
