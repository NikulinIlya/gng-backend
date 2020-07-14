<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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
    if (isset($_COOKIE['vi'])) {
        return view('index');
    }

    if ($request->query('visit') == '37693cfc748049e45') {
        setcookie('vi', '1', time() + 86400 * 7, '/', $_SERVER['HTTP_HOST'], false, false);

        return view('index');
    } else {
        return abort(404);
    }
})->where('uri', '(.*)');
