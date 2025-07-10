<?php
namespace SimplyBook\Models;

/**
 * Service model representing a SimplyBook service
 */
class Service extends AbstractModel
{
    protected $fillable = [
        'id',
        'name',
        'description',
        'deposit_price',
        'duration',
        'tax_id',
        'is_visible',
    ];

    protected $casts = [
        'id' => 'int',
        'deposit_price' => 'float',
        'duration' => 'int',
        'is_visible' => 'bool',
    ];

    /**
     * Get the service price formatted in euro.
     * This method will be called automatically when accessing $service->price
     * 
     * @example echo $service->price; // "€99,99"
     * 
     * @return string
     */
    public function getPriceAttribute(): string
    {
        $price = $this->getAttribute('price');
        $value = $price !== null ? round($price, 2) : 0;
        return '€' . number_format($value, 2, ',', '.');
    }

}