<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductCategory::insert(
            [
                ['id'=> 1,'category'=>'pasta','unit_of_measure'=>'gr'],
                ['id'=> 2,'category'=>'vini','unit_of_measure'=>'litri'],
                ['id'=> 3,'category'=>'confetture','unit_of_measure'=>'gr'],
                ['id'=> 4,'category'=>'biscotti','unit_of_measure'=>'gr'],
            ]
            );
    }
}
