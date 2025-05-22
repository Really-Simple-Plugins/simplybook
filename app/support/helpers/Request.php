<?php namespace SimplyBook\Helpers;

/**
 * Wrapper for easy access to request data with Dot notation.
 *
 * @usage $request = Request::fromGlobal();
 * @usage $request->get('key.key', 'default');
 *
 * @internal phpcs disabled because issues were triggered regarding the use of
 * form data. This is not a problem, as we are not using the data directly.
 * Code that uses this class should validate the data before using it.
 */
class Request extends Storage
{
    //phpcs:disable
    public static function fromGlobal(): Request
    {
        return new static($_REQUEST);
    }

    public static function fromSession(): Request
    {
        $data = (!empty($_SESSION) ? $_SESSION : []);
        return new static($data);
    }

    public static function fromFiles(): Request
    {
        return new static($_FILES);
    }
    //phpcs:enable
}