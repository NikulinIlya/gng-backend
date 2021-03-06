<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Location extends Model
{
    use Translatable;
    protected $translatable = ['country', 'region'];

    /**
     * Get the brands for the location.
     */
    public function brands()
    {
        return $this->hasMany('App\Models\Brand');
    }
}
