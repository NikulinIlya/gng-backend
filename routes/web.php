<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'admin-panel'], function () {
    Route::get('orders/export', 'Api\OrderController@export')->name('orders.export');
    Voyager::routes();
});

Route::get('/{uri?}', function () {
    return view('index');
})->where('uri', '(.*)')->name('index');
