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

Route::get('/category', [CategoriesProduct::class, 'getCategories']);
Route::get('/listproduct/{category}', [CategoriesProduct::class, 'getProductsList']);
Route::get('/userid/{id_user}',[UserShoppingCart::class,'getUserid']);


Route::middleware(['auth:sanctum'])->group(function () {
   
   
    Route::post('/addcartitems',[UserShoppingCart::class,'addcartItems']);
    Route::get('/getcartitems/{user_id}',[UserShoppingCart::class,'getCartItems']);
    Route::post('/removecartitems',[UserShoppingCart::class,'removeCartitem']);
    
    Route::get('/authUser',function(){
        $user= Auth::user();
        return $user;

    });

  
  });

