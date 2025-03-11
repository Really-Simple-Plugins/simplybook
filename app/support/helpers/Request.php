<?php namespace SimplyBook\Helpers;

/**
 * Wrapper for easy access to request data with Dot notation.
 *
 * @usage $request = Request::fromGlobal();
 * @usage $request->get('key.key', 'default');
 */
class Request extends Storage
{
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
}