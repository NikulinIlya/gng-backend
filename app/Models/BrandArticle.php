<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class BrandArticle extends Model
{
    use Translatable;
    protected $translatable = ['name', 'text'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'brand_articles';
}
