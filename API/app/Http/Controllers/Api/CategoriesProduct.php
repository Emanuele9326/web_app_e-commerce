<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductCategory;

class CategoriesProduct extends Controller
{
    /**
     * Revenue product categories
     * 
     */
    
     function getCategories(){

        $getCategory= ProductCategory::select('category')->get();
       
        
       foreach ($getCategory as $key => $value) {
          $category[]=$value['category'];
       };

        return $category;

     }


     /**
      * List of products by category
      * @param  \Illuminate\Http\Request  $request
      * @return \Illuminate\Http\Response
      * 
      */

      function getProductsList(Request $request,$category){
             $list=Product::join('product_categories', 'products.product_category_id','=','product_categories.id')
             ->where('product_categories.category','=',$category)
             ->select('products.id','products.name','products.image','products.price','products.quantity','product_categories.unit_of_measure','products.description')
             ->get();
             return $list;
      }
    
}
