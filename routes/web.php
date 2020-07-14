<?php

use Illuminate\Http\Request;
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
    Voyager::routes();
});

Route::get('/{uri?}', function (Request $request) {
    if ($request->query('visit') == '37693cfc748049e45') {
        return view('index');
    } else {
        return abort(404);
    }
})->where('uri', '(.*)');
