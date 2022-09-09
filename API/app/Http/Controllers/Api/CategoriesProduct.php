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
    
    
    
    
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
