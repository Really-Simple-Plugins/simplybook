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
    public bool $terms = false;
    private array $asArray = [];

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
        $this->email = sanitize_email($email);
        return $this;
    }

    public function setCategory(int $category): CompanyBuilder
    {
        $this->category = (int) $category;
        return $this;
    }

    public function setCompanyName(string $company_name): CompanyBuilder
    {
        $this->company_name = sanitize_text_field($company_name);
        return $this;
    }

    public function setPhone(string $phone): CompanyBuilder
    {
        $this->phone = preg_replace('/[^0-9]/', '', $phone);
        return $this;
    }

    public function setCity(string $city): CompanyBuilder
    {
        $this->city = sanitize_text_field($city);
        return $this;
    }

    public function setAddress(string $address): CompanyBuilder
    {
        $this->address = sanitize_text_field($address);
        return $this;
    }

    public function setService(string $service): CompanyBuilder
    {
        $this->service = sanitize_text_field($service);
        return $this;
    }

    public function setCountry(string $country): CompanyBuilder
    {
        $this->country = sanitize_text_field($country);
        return $this;
    }

    public function setZip(string $zip): CompanyBuilder
    {
        $this->zip = strtolower(str_replace(' ', '', trim(sanitize_text_field($zip))));
        return $this;
    }

    public function setTerms(string $terms): CompanyBuilder
    {
        $this->terms = $terms;
        return $this;
    }

    public function toArray(): array
    {
        if (!empty($this->asArray)) {
            return $this->asArray;
        }

        $this->asArray = [
            'email' => $this->email,
            'category' => $this->category,
            'company_name' => $this->company_name,
            'phone' => $this->phone,
            'city' => $this->city,
            'address' => $this->address,
            'service' => $this->service,
            'country' => $this->country,
            'zip' => $this->zip,
            'terms_accepted' => $this->terms,
        ];

        return $this->asArray;
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