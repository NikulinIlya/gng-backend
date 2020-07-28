<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use TCG\Voyager\Traits\Translatable;

class Product extends Model
{
    use Translatable, Searchable;

    public $asYouType = true;

    protected $translatable = ['name'];

    /**
     * Get the product category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function productCategory()
    {
        return $this->belongsTo('App\Models\ProductCategory');
    }

    /**
     * Get the vine associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function vine()
    {
        return $this->hasOne('App\Models\UserInfo');
    }

    /**
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();

        return [
            'id' => $array['id'],
            'name' => $array['name'],
        ];
    }
}
