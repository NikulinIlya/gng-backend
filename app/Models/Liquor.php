<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Liquor extends Model
{
    use Translatable;
    protected $translatable = ['taste'];

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function colour()
    {
        return $this->belongsTo('App\Models\Colour');
    }
}
