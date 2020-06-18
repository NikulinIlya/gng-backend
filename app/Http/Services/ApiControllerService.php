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

        return $entities;
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
}
