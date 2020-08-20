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
     * Get the associated brand.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function brand()
    {
        return $this->belongsTo('App\Models\Brand');
    }

    /**
     * Get the wine associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function wine()
    {
        return $this->hasOne('App\Models\Vine');
    }

    /**
     * Get the champagne associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function champagne()
    {
        return $this->hasOne('App\Models\Champagne');
    }

    /**
     * Get the cognac associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function cognac()
    {
        return $this->hasOne('App\Models\Cognac');
    }

    /**
     * Get the liquor associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function liquor()
    {
        return $this->hasOne('App\Models\Liquor');
    }

    /**
     * Get the whiskey associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function whiskey()
    {
        return $this->hasOne('App\Models\Whiskey');
    }

    /**
     * Get the vodka associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function vodka()
    {
        return $this->hasOne('App\Models\Vodka');
    }

    /**
     * Get the kit associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function kit()
    {
        return $this->hasOne('App\Models\Kit');
    }

    /**
     * Get the gift idea associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function giftIdea()
    {
        return $this->hasOne('App\Models\GiftIdea');
    }

    /**
     * Get the vintage associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function vintage()
    {
        return $this->hasOne('App\Models\Vintage');
    }

    /**
     * Get the rare associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function rare()
    {
        return $this->hasOne('App\Models\Rare');
    }

    /**
     * Get the glass associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function glass()
    {
        return $this->hasOne('App\Models\Glass');
    }

    /**
     * Get the bag associated with the product.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function bag()
    {
        return $this->hasOne('App\Models\Bag');
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
