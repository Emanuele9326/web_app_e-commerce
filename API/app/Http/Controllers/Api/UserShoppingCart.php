<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UserCart;
use GuzzleHttp\Psr7\Response;

class UserShoppingCart extends Controller
{
    
    /**
     * get Id user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
      function getUserid($user_email){
         return User::where('users.email',$user_email)
         ->select('id','name')->get();
      }

    function getCartItems($user_id){
        $item = CartItem::join('products',  'cart_items.product_id','=','products.id')
        ->where('cart_items.user_id',$user_id)
        ->select(
        'products.id',
        'cart_items.product_code',
        'products.name',
        'cart_items.quantity',
        'products.price',
        'products.description',
        'products.image',
        'cart_items.updated_at',
    )->get();
        return $item;
    }

    
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    function addcartItems(Request $request)
    {



        $payload= array_values($request->all());
       
       
    
     //dd($payload);


        CartItem::upsert(

            $payload,
            ['id','product_code'],
            ['product_id','user_id','quantity']

        );
        
    }
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    function removeCartitem(Request $request){

        $user_cart_id = $request->user_cart_id;
        $product_code= $request->product_code;

        CartItem::where('user_id',$user_cart_id)
        ->where('product_code',$product_code)
        ->delete();

        return  response()->json(['status' => 'ok',
         "product_code"=>$product_code]);
       


    }
}
