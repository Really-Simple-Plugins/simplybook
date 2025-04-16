/**
 *  There currently is an issue with Chalk. The issue is that Chalk is an ESM module, but the @tanstack/router-plugin is trying to load it with require(). This is causing an error when the plugin is run in a CommonJS environment.
 *
 *  Fix in node_modules: modify the @tanstack/router-plugin (specifically the logger.cjs file) to use import() for loading chalk dynamically. This will fix the issue of trying to load an ESM module with require().
 *
 *  Locate the logger.cjs file inside the node_modules/@tanstack/router-plugin/dist/cjs/ directory.
 *  Modify the require() statement to import():
 *  Change:
 *
 *  const chalk = require('chalk');
 *  To:
 *
 * const chalk = import('chalk');
 *
 * Below script runs after each npm update to fix the issue.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'node_modules', '@tanstack', 'router-plugin', 'dist', 'cjs', 'logger.cjs');

// Check if the file exists
if (!fs.existsSync(filePath)) {
    return; // No file found that needs fixing
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    const result = data.replace("const chalk = require('chalk');", "const chalk = import('chalk');");

    fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Chalk import fixed in logger.cjs');
        }
    });
});