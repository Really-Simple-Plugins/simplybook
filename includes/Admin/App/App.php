<?php

namespace Simplybook\Admin\App;

class App {
	public function __construct() {
		// Any initialization code for App can go here
	}

	public function simplybook_app() {
		?>
        <style>
            .toplevel_page_simplybook #wpcontent {
                padding-left: 0;
            }
        </style>
        <div id="simplybook_app">

        </div>
		<?php
	}
}
