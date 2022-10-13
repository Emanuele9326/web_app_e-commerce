<?php

namespace App\Models;

use App\Models\Scopes\WhereScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::addGlobalScope(new WhereScope);
    }
}