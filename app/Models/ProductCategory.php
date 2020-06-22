<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class ProductCategory extends Model
{
    use Translatable;
    protected $translatable = ['name'];

    /**
     * Get the products for the category.
     */
    public function products()
    {
        return $this->hasMany('App\Models\Product');
    }
}
