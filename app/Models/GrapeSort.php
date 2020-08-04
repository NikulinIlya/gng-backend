<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class GrapeSort extends Model
{
    use Translatable;
    protected $translatable = ['description'];

    /**
     * Get vines of grape sorts.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function vines()
    {
        return $this->belongsToMany('App\Models\Vine', 'vines_grapes')
            ->using('App\Models\VinesGrape');
    }

    /**
     * Get champagnes for grape sorts.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function champagne()
    {
        return $this->belongsToMany('App\Models\Champagne', 'champagne_grapes')
            ->using('App\Models\ChampagneGrape');
    }
}
