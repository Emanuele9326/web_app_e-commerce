<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Authentication;
use App\Http\Controllers\Api\CategoriesProduct;
use App\Http\Controllers\Api\UserShoppingCart;
use Illuminate\Support\Facades\Auth;

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

Route::get('/categories', [CategoriesProduct::class, 'getCategories']);
Route::get('/categories/{id}/products', [CategoriesProduct::class, 'getProductsList']);
Route::get('/users/{id}', [UserShoppingCart::class, 'getUserid']);

Route::middleware(['auth:sanctum'])->group(function () {


    Route::post('/cart', [UserShoppingCart::class, 'addcartItems']);
    Route::get('/cart', [UserShoppingCart::class, 'getCartItems']);
    Route::delete('/cart/{id}', [UserShoppingCart::class, 'removeCartitem']);

    Route::get('/users', function () {
        $user = Auth::user();
        return $user;
    });
});