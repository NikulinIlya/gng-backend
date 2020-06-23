<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Colour extends Model
{
    use Translatable;
    protected $translatable = ['name'];

    /**
     * Get the vines of the colours.
     */
    public function vines()
    {
        return $this->hasMany('App\Models\Vine');
    }
}
