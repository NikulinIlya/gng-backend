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
}
