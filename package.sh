#!/bin/bash

# Determine the path where this script is located
ROOT_DIR=$(dirname "$0")

# Extract folder name to use as plugin name
PLUGIN_NAME=${ROOT_DIR##*/};

# List of patterns or folders to exclude from rsync copy
EXCLUDES=(
  "--exclude=react/node_modules"
  "--exclude=assets/block/node_modules"
  "--exclude=vendor"
  "--exclude=.git"
  "--exclude=.gitignore"
  "--exclude=.wp-env.json"
  "--exclude=package.sh"
);

# First make sure React build is up to date
printf "Making sure React build is up to date... \n"
cd "${ROOT_DIR}"/react || exit
npm install
npm run build
npm run build:css
cd "${ROOT_DIR}" || exit

# Clean up any previous build artifacts
rm -rf /tmp/"${PLUGIN_NAME}" /tmp/"${PLUGIN_NAME}".zip "${PLUGIN_NAME}".zip

# Copy the plugin to /tmp while excluding the EXCLUDES list
printf "Copying %s to /tmp \n" "${PLUGIN_NAME}"
rsync -a -q "${EXCLUDES[@]}" . /tmp/"${PLUGIN_NAME}"

# Change to the temporary directory
cd /tmp/"${PLUGIN_NAME}" || exit

printf "Installing composer packages (production only)... \n"
composer install --no-dev --optimize-autoloader

# Strip out files that are not meant to be shipped
printf "Cleaning up dev-related files... \n"
rm -rf ./composer.json ./composer.lock

# Enable extended pattern matching for glob operations like !(pattern)
printf "Enabling extended glob patterns... \n"
shopt -s extglob

# Remove everything from react folder except src and build folder
printf "Cleanup react app \n"
cd /tmp/"${PLUGIN_NAME}"/react || exit
rm -rf ..?* .[!.]* !(src|build)

# Remove everything from Gutenberg block except src and build folder
printf "Cleanup Gutenberg block \n"
cd /tmp/"${PLUGIN_NAME}"/assets/block || exit
rm -rf ..?* .[!.]* !(src|build)

cd /tmp/ || exit
zip -rqT "${PLUGIN_NAME}".zip "${PLUGIN_NAME}"/

echo "✅ All done! Your package '${PLUGIN_NAME}.zip' is ready."