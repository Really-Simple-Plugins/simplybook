<?php
defined( 'ABSPATH' ) or die( );

$fields = [];
foreach ( glob( __DIR__ . '/Fields/*.php' ) as $file ) {
	$fields = array_merge( $fields, include $file );
}
return $fields;