<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Brand extends Model
{
    use Translatable;
    protected $translatable = ['description'];

    /**
     * Get the location where from the brand is.
     */
    public function location()
    {
        return $this->belongsTo('App\Models\Location');
    }
}
