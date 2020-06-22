<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Product extends Model
{
    use Translatable;
    protected $translatable = ['name'];

    /**
     * Get the product category.
     */
    public function productCategory()
    {
        return $this->belongsTo('App\Models\ProductCategory');
    }
}
