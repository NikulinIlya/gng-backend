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

Route::get(
    'lang/{locale?}',
    function (Request $request, $locale = 'ru') {
        if (! in_array($locale, ['ru', 'en'])) {
            abort(404);
        }

        app()->setLocale($locale);

        $request->session()->put('locale', $locale);

        setcookie('locale', $locale, [
            'expires' => time() + 86400 * 365,
            'path' => '/',
            'domain' => $_SERVER['HTTP_HOST'],
            'secure' => false,
            'httponly' => false,
            'samesite' => 'None'
        ]);

        return response()->json($locale);
    }
);

Route::post('register', 'Api\Auth\RegisterController@register');
Route::post('resend-verify', 'Api\Auth\RegisterController@resendVerificationEmail');
Route::post('verify', 'Api\Auth\VerificationController@verify');
Route::post('login', 'Api\Auth\LoginController@login');
Route::post('forgot-password', 'Api\Auth\ForgotPasswordController@forgot');
Route::post('forgot-password/reset', 'Api\Auth\ForgotPasswordController@reset');

Route::middleware('auth:sanctum')->group(
    function () {
        Route::get(
            '/user',
            function (Request $request) {
                return $request->user();
            }
        );

        Route::get('/user-info', 'Api\UserInfoController@show');
        Route::put('/update-user-info', 'Api\UserInfoController@update');

        Route::get('orders', 'Api\OrderController@index');
        Route::post('orders/create', 'Api\OrderController@store');

        Route::post('logout', 'Api\Auth\LoginController@logout');
        Route::post('password/reset', 'Api\Auth\ResetPasswordController@reset');
    }
);

Route::get('phrases', 'Api\MainPhraseController@index');
Route::get('phrases/{id}', 'Api\MainPhraseController@show');

Route::get('about-info', 'Api\AboutInfoController@index');
Route::get('about-info/{id}', 'Api\AboutInfoController@show');

Route::get('locations', 'Api\LocationController@index');
Route::get('locations/{id}', 'Api\LocationController@show');

Route::get('assistant-phrases', 'Api\AssistantPhraseController@index');
Route::get('assistant-phrases/{id}', 'Api\AssistantPhraseController@show');
Route::get('assistant-phrases-specified/{brandId}', 'Api\AssistantPhraseController@getByBrand');

Route::get('promotions', 'Api\PromotionController@index');
Route::get('promotions/{id}', 'Api\PromotionController@show');

Route::get('products', 'Api\ProductController@index');
Route::get('products/{id}', 'Api\ProductController@show');
Route::get('search-products', 'Api\ProductController@search');
Route::get('product-with-settings/{id}', 'Api\ProductController@showProductWithSettings');
Route::get('popular-products', 'Api\ProductController@getPopularProducts');

Route::get('product-categories', 'Api\ProductCategoryController@index');
Route::get('product-categories/{id}', 'Api\ProductCategoryController@show');
Route::get('product-categories-filters/{categorySlug}', 'Api\ProductCategoryController@getFilters');
Route::get('products-by-category/{categorySlug}', 'Api\ProductCategoryController@getProductsByCategory');
Route::get('strong-drinks', 'Api\ProductCategoryController@getStrongDrinks');
Route::get('strong-drinks/filters', 'Api\ProductCategoryController@getStrongDrinksFilters');

Route::get('brands', 'Api\BrandController@index');
Route::get('brands/{id}', 'Api\BrandController@show');

Route::get('vines', 'Api\VineController@index');
Route::get('vines/{id}', 'Api\VineController@show');
Route::get('vines-with-products', 'Api\VineController@getWithProducts');

Route::get('champagnes', 'Api\ChampagneController@index');
Route::get('champagnes/{id}', 'Api\ChampagneController@show');

Route::get('cognac', 'Api\CognacController@index');
Route::get('cognac/{id}', 'Api\CognacController@show');

Route::get('colours', 'Api\ColourController@index');
Route::get('colours/{id}', 'Api\ColourController@show');

Route::get('employee-offers', 'Api\EmployeeOfferController@index');
Route::get('employee-offers/{id}', 'Api\EmployeeOfferController@show');

Route::get('events', 'Api\EventController@index');
Route::get('events/{id}', 'Api\EventController@show');

Route::get('event-orders', 'Api\EventOrderController@index');
Route::get('event-orders/{id}', 'Api\EventOrderController@show');

Route::get('favorites', 'Api\FavoritesController@index');
Route::get('favorites/{id}', 'Api\FavoritesController@show');

Route::get('gift-ideas', 'Api\GiftIdeaController@index');
Route::get('gift-ideas/{id}', 'Api\GiftIdeaController@show');

Route::get('grape-sorts', 'Api\GrapeSortController@index');
Route::get('grape-sorts/{id}', 'Api\GrapeSortController@show');

Route::get('kits', 'Api\KitController@index');
Route::get('kits/{id}', 'Api\KitController@show');

Route::get('liquors', 'Api\LiquorController@index');
Route::get('liquors/{id}', 'Api\LiquorController@show');

Route::get('rares', 'Api\RareController@index');
Route::get('rares/{id}', 'Api\RareController@show');

Route::get('vintages', 'Api\VintageController@index');
Route::get('vintages/{id}', 'Api\VintageController@show');

Route::get('vodka', 'Api\VodkaController@index');
Route::get('vodka/{id}', 'Api\VodkaController@show');

Route::get('whiskey', 'Api\WhiskeyController@index');
Route::get('whiskey/{id}', 'Api\WhiskeyController@show');

Route::get('bags', 'Api\BagController@index');
Route::get('bags/{id}', 'Api\BagController@show');

Route::get('glasses', 'Api\GlassController@index');
Route::get('glasses/{id}', 'Api\GlassController@show');

Route::get('tequila', 'Api\TequilaController@index');
Route::get('tequila/{id}', 'Api\TequilaController@show');

Route::get('gin', 'Api\GinController@index');
Route::get('gin/{id}', 'Api\GinController@show');

Route::prefix('articles')->group(
    function () {
        Route::get('/brands', 'Api\BrandArticleController@index');
        Route::get('/brands/{id}', 'Api\BrandArticleController@show');
        Route::get('/brands-by/{brandId}', 'Api\BrandArticleController@showByBrand');

        Route::get('/grapes', 'Api\GrapeArticleController@index');
        Route::get('/grapes/{id}', 'Api\GrapeArticleController@show');
        Route::get('/grapes-by/{grapeId}', 'Api\GrapeArticleController@showByGrape');

        Route::get('/regions', 'Api\RegionArticleController@index');
        Route::get('/regions/{id}', 'Api\RegionArticleController@show');
        Route::get('/regions-by/{locationId}', 'Api\RegionArticleController@showByLocation');
    }
);

Route::prefix('cart')->group(
    function () {
        Route::get('/', 'Api\CartController@index')->name('cart.index');
        Route::get('/total', 'Api\CartController@total')->name('cart.total');
        Route::get('/count', 'Api\CartController@count')->name('cart.count');
        Route::post('/', 'Api\CartController@store')->name('cart.store');
        Route::delete('/', 'Api\CartController@clear')->name('cart.clear');
        Route::delete('/{rowId}', 'Api\CartController@remove')->name('cart.remove');
        Route::patch('/{rowId}', 'Api\CartController@update')->name('cart.update');
    }
);
