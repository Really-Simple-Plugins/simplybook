<?php
namespace Simplybook\Api;

if ( ! defined( 'ABSPATH' ) ) exit;

if ( !class_exists('SimplybookException' )) {
    class SimplybookException extends Exception
    {

    }
}