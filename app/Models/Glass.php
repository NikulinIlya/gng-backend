<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Glass extends Model
{
    use Translatable;
    protected $translatable = ['name', 'description'];

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
}
