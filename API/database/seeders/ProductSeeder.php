<?php

namespace Database\Seeders;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //DB::table('products')->delete();
        //Product::truncate();
        $csvData = fopen(base_path('database/csv/products.csv'), 'r');
        $transRow = true;
        while (($data = fgetcsv($csvData, 555, ',')) !== false) {
            if (!$transRow) {
                Product::create([
                    'name' => $data['0'],
                    'product_category_id' => $data['1'],
                    'quantity' => $data['2'],
                    'price' => $data['3'],
                    'description' => $data['4'],
                    'image' => $data['5'],
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
            }
            $transRow = false;
        }
        fclose($csvData);
    }
}
