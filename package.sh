#!/bin/bash

# Get the directory of the current script
PLUGIN_ROOT=$(dirname "$0")

# Current Directory Name
PLUGIN_NAME=${PLUGIN_ROOT##*/};

# Just in case remove previous packaging
rm -rf /tmp/"${PLUGIN_NAME}" /tmp/"${PLUGIN_NAME}".zip "${PLUGIN_NAME}".zip

# Copy the plugin to /tmp while excluding node_modules folders
printf "Copying %s to /tmp \n" "${PLUGIN_NAME}"
rsync -av --exclude='react/node_modules' --exclude='assets/block/node_modules' . /tmp/"${PLUGIN_NAME}"
cd /tmp/"${PLUGIN_NAME}" || exit

printf "Removing old vendor and git folders \n"
rm -rf ./vendor ./.git ./.gitignore

printf "Installing dependencies \n"
composer install --no-dev --optimize-autoloader

printf "Turn on extended globbing that gives us the correct syntax options \n"
shopt -s extglob

# Edit here to remove files from package
printf "Remove development files \n"
rm -rf ./composer.json ./composer.lock ./.wp-env.json ./package.sh

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

printf "Done! Archive %s generated! \n" "${PLUGIN_NAME}.zip"