#  Guide for WP plugins developers  Really Simple Plugins

## Basic installation
### 1. Install wp-env & docker. Instructions can be found here: https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-env/
### 2. Installl composer
### 3. Install npm and node.js


# Example structure
```
/my-plugin/
│
├── /admin-app/           # Your React app for the admin dashboard
│   └── ...               # React app files (JS, CSS, etc.)
│
├── /includes/            # All PHP code goes here
│   ├── class-plugin.php  # Main plugin class
│   ├── admin.php         # Admin-specific PHP code
│   ├── frontend.php      # Frontend-specific PHP code
│   └── helpers.php       # Helper functions
│
├── /assets/              # Any CSS, JS, or images
│   ├── /css/             # Plugin stylesheets
│   └── /js/              # Plugin JavaScript
│
├── /languages/           # Translation files (optional)
│
├── my-plugin.php         # Main plugin file
├── package.json          # NPM dependencies (if any)
├── readme.txt            # Plugin readme
└── uninstall.php         # Code to clean up on uninstall
```

