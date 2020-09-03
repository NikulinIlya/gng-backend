<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Translatable;

class GrapeArticle extends Model
{
    use Translatable;
    protected $translatable = ['name', 'text'];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'grape_articles';
}
