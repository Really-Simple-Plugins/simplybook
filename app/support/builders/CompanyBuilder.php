<?php namespace SimplyBook\Builders;

class CompanyBuilder
{
    public string $email = '';
    public int $category = 0;
    public string $company_name = '';
    public string $phone = '';
    public string $city = '';
    public string $address = '';
    public string $service = '';
    public string $country = '';
    public string $zip = '';

    /**
     * Method can be used to build a CompanyBuilder object from an array of
     * key-value pairs. Only known properties will be set. Make sure the key
     * matches the property name.
     */
    public function buildFromArray(array $properties = []): CompanyBuilder
    {
        foreach ($properties as $key => $value) {
            $method = $this->methodFromPropertyName($key);

            if ((property_exists($this, $key) === false) || (method_exists($this, $method) === false)) {
                continue;
            }

            $this->{$method}($value);
        }

        return $this;
    }

    public function setEmail(string $email): CompanyBuilder
    {
        $this->email = $email;
        return $this;
    }

    public function setCategory(int $category): CompanyBuilder
    {
        $this->category = $category;
        return $this;
    }

    public function setCompanyName(string $company_name): CompanyBuilder
    {
        $this->company_name = $company_name;
        return $this;
    }

    public function setPhone(string $phone): CompanyBuilder
    {
        $this->phone = $phone;
        return $this;
    }

    public function setCity(string $city): CompanyBuilder
    {
        $this->city = $city;
        return $this;
    }

    public function setAddress(string $address): CompanyBuilder
    {
        $this->address = $address;
        return $this;
    }

    public function setService(string $service): CompanyBuilder
    {
        $this->service = $service;
        return $this;
    }

    public function setCountry(string $country): CompanyBuilder
    {
        $this->country = $country;
        return $this;
    }

    public function setZip(string $zip): CompanyBuilder
    {
        $this->zip = strtolower(str_replace(' ', '', trim($zip)));
        return $this;
    }

    public function toArray(): array
    {
        return [
            'email' => $this->email,
            'category' => $this->category,
            'company_name' => $this->company_name,
            'phone' => $this->phone,
            'city' => $this->city,
            'address' => $this->address,
            'service' => $this->service,
            'country' => $this->country,
        ];
    }

    /**
     * Converts a property name to a method name. It will remove underscores
     *
     */
    private function methodFromPropertyName(string $property): string
    {
        return 'set' . str_replace('_', '', ucwords($property, '_'));
    }
}