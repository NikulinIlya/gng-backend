<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Champagne extends Model
{
    use Translatable;

    protected $translatable = ['aging', 'cheese', 'recommendations'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'champagne';

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    /**
     * Get grape sorts for champagnes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function grapeSorts()
    {
        return $this->belongsToMany('App\Models\GrapeSort', 'champagne_grapes')
            ->using('App\Models\ChampagneGrape');
    }
}
