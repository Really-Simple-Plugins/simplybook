<?php
namespace SimplyBook\Models;

/**
 * Provider model representing a SimplyBook provider
 */
class Provider extends BaseModel
{
    protected array $fillable = [
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

    protected array $casts = [
        'id' => 'int',
        'qty' => 'int',
        'quantity' => 'int',
        'is_visible' => 'bool',
    ];

    /**
     * Get the provider name
     */
    public function getName(): ?string
    {
        return $this->getAttribute('name');
    }

    /**
     * Set the provider name
     */
    public function setName(string $name): static
    {
        $this->setAttribute('name', $name);
        return $this;
    }

    /**
     * Get the provider description
     */
    public function getDescription(): ?string
    {
        return $this->getAttribute('description');
    }

    /**
     * Set the provider description
     */
    public function setDescription(string $description): static
    {
        $this->setAttribute('description', $description);
        return $this;
    }

    /**
     * Get the provider email
     */
    public function getEmail(): ?string
    {
        return $this->getAttribute('email');
    }

    /**
     * Set the provider email
     */
    public function setEmail(string $email): static
    {
        $this->setAttribute('email', $email);
        return $this;
    }

    /**
     * Get the provider phone
     */
    public function getPhone(): ?string
    {
        return $this->getAttribute('phone');
    }

    /**
     * Set the provider phone
     */
    public function setPhone(string $phone): static
    {
        $this->setAttribute('phone', $phone);
        return $this;
    }

    /**
     * Get the provider quantity
     */
    public function getQuantity(): ?int
    {
        return $this->getAttribute('qty') ?? $this->getAttribute('quantity');
    }

    /**
     * Set the provider quantity
     */
    public function setQuantity(int $quantity): static
    {
        $this->setAttribute('qty', $quantity);
        return $this;
    }

    /**
     * Get the provider color
     */
    public function getColor(): ?string
    {
        return $this->getAttribute('color');
    }

    /**
     * Set the provider color
     */
    public function setColor(string $color): static
    {
        $this->setAttribute('color', $color);
        return $this;
    }

    /**
     * Check if provider is visible
     */
    public function isVisible(): bool
    {
        return (bool) $this->getAttribute('is_visible');
    }

    /**
     * Set provider visibility
     */
    public function setVisible(bool $visible): static
    {
        $this->setAttribute('is_visible', $visible);
        return $this;
    }
}