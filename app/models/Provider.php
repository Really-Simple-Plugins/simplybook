<?php
namespace SimplyBook\Models;

/**
 * Provider model representing a SimplyBook provider
 */
class Provider extends AbstractModel
{
    protected $fillable = [
        'id',
        'name',
        'description',
        'email',
        'phone',
        'qty',
        'quantity',
        'color',
        'is_visible',
    ];

    protected $casts = [
        'id' => 'int',
        'qty' => 'int',
        'quantity' => 'int',
        'is_visible' => 'bool',
    ];

}