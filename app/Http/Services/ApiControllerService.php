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
        $entities = $this->model::withTranslations($this->language)->get();

        $resultCollection = collect();
        foreach ($entities as $entity) {
            $translationsArray = $this->getTranslatedFields($entity);
            $collection = [$entity['id'], $entity['slug'], $translationsArray];
            $resultCollection = $resultCollection->concat([$collection]);
        }

        return $resultCollection;
    }

    /**
     * Display the specified entity with set content fields.
     *
     * @param int $id
     * @return mixed
     */
    public function show($id)
    {
        return $this->model::withTranslations($this->language)->findOrFail($id);
    }

    /**
     * Get only translated values from entity.
     *
     * @param Model $entity
     * @return array
     */
    public function getTranslatedFields($entity)
    {
        dd(get_class($entity), gettype($entity));
        $resultArray = [];

        foreach ($entity['translations'] as $translation) {
            $resultArray[$translation['column_name']] = $translation['value'];
        }

        return $resultArray;
    }
}
