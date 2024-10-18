<?php
namespace Simplybook\Api;
use Exception;

if ( ! defined( 'ABSPATH' ) ) exit;

if ( !class_exists('SimplybookException' )) {
    class SimplybookException extends Exception
    {

    }
}