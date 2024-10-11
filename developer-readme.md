#  Guide for WP plugins developers  Really Simple Plugins

## Basic installation
### 1. Install wp-env & docker. Instructions can be found here: https://developer.wordpress.org/block-editor/getting-started/devenv/get-started-with-wp-env/
### 2. Installl composer
### 3. Install npm and node.js
### 4. Configure prettier for Tailwind

To set up Prettier in PHPStorm:

- Go to Preferences search for Prettier.
- Set the path to the prettier binary (e.g., node_modules/.bin/prettier).
- Check the box for **"On code reformat"** (cmd + shift + L)  or on Save if you like.
- Now, whenever you format your files and/or save them, Prettier will run and order your Tailwind CSS classes.

# Example structure
```
/my-plugin/
│
├── /includes/            # All PHP code goes here
│
├── /languages/           # Translation files (optional)
│
├── my-plugin.php         # Main plugin file
├── readme.txt            # Plugin readme
└── uninstall.php         # Code to clean up on uninstall
```

