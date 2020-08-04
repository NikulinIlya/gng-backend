<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Vine extends Model
{
    use Translatable;
    protected $translatable = ['cheese', 'recommendations'];

    /**
     * Get the colour that the vine has.
     */
    public function colour()
    {
        return $this->belongsTo('App\Models\Colour');
    }

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    /**
     * Get grape sorts for vines.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function grapeSorts()
    {
        return $this->belongsToMany('App\Models\GrapeSort', 'vines_grapes')
            ->using('App\Models\VinesGrape');
    }
}
