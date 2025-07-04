<?php
namespace SimplyBook\Models;

/**
 * Service model representing a SimplyBook service
 */
class Service extends BaseModel
{
    protected array $fillable = [
        'id',
        'name',
        'description',
        'price',
        'deposit_price',
        'duration',
        'tax_id',
        'is_visible',
    ];

    protected array $casts = [
        'id' => 'int',
        'price' => 'float',
        'deposit_price' => 'float',
        'duration' => 'int',
        'is_visible' => 'bool',
    ];

    /**
     * Get the service name
     */
    public function getName(): ?string
    {
        return $this->getAttribute('name');
    }

    /**
     * Set the service name
     */
    public function setName(string $name): static
    {
        $this->setAttribute('name', $name);
        return $this;
    }

    /**
     * Get the service description
     */
    public function getDescription(): ?string
    {
        return $this->getAttribute('description');
    }

    /**
     * Set the service description
     */
    public function setDescription(string $description): static
    {
        $this->setAttribute('description', $description);
        return $this;
    }

    /**
     * Get the service price
     */
    public function getPrice(): ?float
    {
        return $this->getAttribute('price');
    }

    /**
     * Set the service price
     */
    public function setPrice(float $price): static
    {
        $this->setAttribute('price', $price);
        return $this;
    }

    /**
     * Get the service duration in minutes
     */
    public function getDuration(): ?int
    {
        return $this->getAttribute('duration');
    }

    /**
     * Set the service duration in minutes
     */
    public function setDuration(int $duration): static
    {
        $this->setAttribute('duration', $duration);
        return $this;
    }

    /**
     * Check if service is visible
     */
    public function isVisible(): bool
    {
        return (bool) $this->getAttribute('is_visible');
    }

    /**
     * Set service visibility
     */
    public function setVisible(bool $visible): static
    {
        $this->setAttribute('is_visible', $visible);
        return $this;
    }
}