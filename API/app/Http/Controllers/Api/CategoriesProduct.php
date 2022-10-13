<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductCategory;

class CategoriesProduct extends Controller
{
   /**
    * product categories
    * 
    */

   function getCategories()
   {

      $category = ProductCategory::pluck('category', 'id')->all();

      return $category;
   }


   /**
    * List of products by category
    * @param  \Illuminate\Http\Request  $request
    * @return \Illuminate\Http\Response
    * 
    */

   function getProductsList(Request $request, $id_category)
   {
      $list = ProductCategory::find($id_category)->products()->get();
      return $list;
   }
}