<?php

namespace SimplyBook\Support\Builders;

class CompanyBuilder
{
    public string $email = '';
    public string $userLogin = '';
    public int $category = 0;
    public string $company_name = '';
    public string $phone = '';
    public string $city = '';
    public string $address = '';
    public string $service = '';
    public string $country = '';
    public string $zip = '';
    public bool $terms = false;
    public bool $marketingConsent = false;
    public string $password = ''; // Should be encrypted

    private array $asArray = [];
    private int $defaultCategory = 8; // Default category is 8: "Other category"

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
        $this->category = ($category < 1 ? $this->defaultCategory : $category);
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

    public function setTerms(bool $terms): CompanyBuilder
    {
        $this->terms = $terms;
        return $this;
    }

    public function setMarketingConsent(bool $marketingConsent): CompanyBuilder
    {
        $this->marketingConsent = $marketingConsent;
        return $this;
    }

    public function setPassword(string $password): CompanyBuilder
    {
        $this->password = sanitize_text_field($password);
        return $this;
    }

    /**
     * The user login is by default the email address. But a user can change
     * this in the SimplyBook system, so for existing accounts this value
     * can be different.
     */
    public function setUserLogin(string $userLogin): CompanyBuilder
    {
        $this->userLogin = sanitize_text_field($userLogin);
        return $this;
    }

    public function toArray(): array
    {
        if (!empty($this->asArray)) {
            return $this->asArray;
        }

        $this->asArray = [
            'email' => $this->email,
            'userLogin' => $this->userLogin,
            'category' => $this->category,
            'company_name' => $this->company_name,
            'phone' => $this->phone,
            'city' => $this->city,
            'address' => $this->address,
            'service' => $this->service,
            'country' => $this->country,
            'zip' => $this->zip,
            'terms' => $this->terms,
            'marketingConsent' => $this->marketingConsent,
            'password' => $this->password, // Should be encrypted
        ];

        return $this->asArray;
    }

    /**
     * Converts a property name to a method name. It will remove underscores
     */
    private function methodFromPropertyName(string $property): string
    {
        return 'set' . str_replace('_', '', ucwords($property, '_'));
    }

    /**
     * Method to check if the object is valid. It will check if any value is
     * empty. Only use this during onboarding, that is where we ask for all the
     * data. This method is not needed for login.
     */
    public function isValid(): bool
    {
        return count($this->getInvalidFields()) === 0;
    }

    /**
     * Method to get the invalid fields. It will return an array of keys that
     * are empty. Only use this during onboarding, that is where we ask for all the
     * data. This method is not needed for login.
     * Note: Boolean fields (terms, marketingConsent) are always considered valid.
     */
    public function getInvalidFields(): array
    {
        return array_keys(array_filter($this->toArray(), fn($value) => !is_bool($value) && empty($value)));
    }
}
