<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('lang/{locale?}', function (Request $request, $locale = 'ru') {
    if (! in_array($locale, ['ru', 'en'])) {
        abort(404);
    }

    app()->setLocale($locale);

    $request->session()->put('locale', $locale);

    return response()->json($locale, 200);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::get('phrases', 'Api\MainPhraseController@index');
Route::get('phrases/{id}', 'Api\MainPhraseController@show');

Route::get('about-info', 'Api\AboutInfoController@index');
Route::get('about-info/{id}', 'Api\AboutInfoController@show');

Route::get('locations', 'Api\LocationController@index');
Route::get('locations/{id}', 'Api\LocationController@show');

Route::get('accessories', 'Api\AccessoryController@index');
Route::get('accessories/{id}', 'Api\AccessoryController@show');

Route::get('assistants', 'Api\AssistantController@index');
Route::get('assistants/{id}', 'Api\AssistantController@show');

Route::get('assistant-phrases', 'Api\AssistantPhraseController@index');
Route::get('assistant-phrases/{id}', 'Api\AssistantPhraseController@show');
Route::get('assistant-phrases-specified/{assistantId}', 'Api\AssistantPhraseController@getByAssistant');

Route::get('products', 'Api\ProductController@index');
Route::get('products/{id}', 'Api\ProductController@show');

Route::get('product-categories', 'Api\ProductCategoryController@index');
Route::get('product-categories/{id}', 'Api\ProductCategoryController@show');

Route::get('brands', 'Api\BrandController@index');
Route::get('brands/{id}', 'Api\BrandController@show');

Route::get('vines', 'Api\VineController@index');
Route::get('vines/{id}', 'Api\VineController@show');

Route::get('champagnes', 'Api\ChampagneController@index');
Route::get('champagnes/{id}', 'Api\ChampagneController@show');

Route::get('cognac', 'Api\CognacController@index');
Route::get('cognac/{id}', 'Api\CognacController@show');
