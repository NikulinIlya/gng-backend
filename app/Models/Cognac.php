<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class Cognac extends Model
{
    use Translatable;
    protected $translatable = ['aging', 'cheese', 'recommendations'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'cognac';

    /**
     * Get the product.
     */
    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }
}
