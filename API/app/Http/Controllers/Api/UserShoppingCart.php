<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\User;
use Illuminate\Http\Request;



class UserShoppingCart extends Controller
{
    /**
     * Get Id user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    function getUserid(Request  $request, $user_email)
    {
        return User::where('users.email', $user_email)
            ->select('id', 'name')->get();
    }
    /**
     * For the authenticated user, it goes to read the products in the cart_items table if present;
     * 
     * 
     */

    function getCartItems(Request $request)
    {


        $item = CartItem::join('products',  'cart_items.product_id', '=', 'products.id')
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
     * Add products to cartItems  for the authenticated user.;
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    function addcartItems(Request $request)
    {



        $payload = array_values($request->all());


        CartItem::upsert(

            $payload,
            ['id', 'product_code'],
            ['product_id', 'user_id', 'quantity']

        );
    }
    /**
     * removes the products in the cartItems for the authenticated user.;
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    function removeCartitem(Request $request, $id)
    {

        $code_product = $id;

        CartItem::where('product_code', $code_product)->delete();

        return  response()->json([
            'status' => 'ok',
            "product_code" => $code_product,

        ]);
    }
}