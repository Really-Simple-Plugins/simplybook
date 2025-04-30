#!/bin/bash

# Retrieve the defined constants from the constants.sh file
source "./constants.sh"

# Extract folder name to use as plugin name
PLUGIN_NAME=${ROOT_DIR##*/}

# Extract "Text Domain:" from the main file of the plugin
TEXT_DOMAIN=$(grep -m 1 "Text Domain:" "${ROOT_DIR}/${PLUGIN_NAME}.php" | awk -F': ' '{print $2}' | xargs)

# Abort if any function (except extended glob) is not installed from this script
REQUIRED_COMMANDS=(
  "rsync"
  "composer"
  "zip"
  "npm"
  "shopt"
)

# List of patterns or folders to exclude from rsync copy
EXCLUDES=(
  "--exclude=react/node_modules"
  "--exclude=assets/block/node_modules"
  "--exclude=vendor"
  "--exclude=.git"
  "--exclude=.gitignore"
  "--exclude=.wp-env.json"
  "--exclude=scripts"
  "--exclude=.idea"
  "--exclude=.vscode"
  "--exclude=.DS_Store"
)

# Check if the required commands are installed before proceeding
for cmd in "${REQUIRED_COMMANDS[@]}"; do
  if ! command -v "$cmd" &> /dev/null; then
    printf "${RED}Error: command \"%s\" is not installed. Please install it and try again.${RESET}\n" "$cmd"
    exit 1
  fi
done

# Ask user to confirm executing this script with an explanation of what it does
printf "${BLUE}This script will create a zip package of the plugin for distribution.${RESET}\n"
printf "${BLUE}It will copy the plugin to your /tmp directory, install dependencies, and clean up unnecessary files. ${RESET}\n"
read -p "$(printf "${BLUE}Do you want to continue? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborting...${RESET}\n"
  exit 1
fi

# Ask the user to confirm or set the plugin name
printf "\n${BLUE}Detected plugin name: ${YELLOW}%s${RESET}\n" "${PLUGIN_NAME}"
read -p "$(printf "${BLUE}Do you want to use this for the package? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  read -p "$(printf "${BLUE}Please enter the correct plugin name: ${RESET}")" PLUGIN_NAME
  if [[ -z "$PLUGIN_NAME" ]]; then
    printf "${RED}Error: Plugin name cannot be empty.${RESET}\n"
    exit 1
  fi
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} for the zip file.${RESET}\n\n" "${PLUGIN_NAME}"

# Ask the user to confirm or set the text domain
printf "${BLUE}Detected text domain: ${YELLOW}%s${RESET}\n" "${TEXT_DOMAIN}"
read -p "$(printf "${BLUE}Do you want to use this for the translations? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  read -p "$(printf "${BLUE}Please enter the correct text domain: ${RESET}")" TEXT_DOMAIN
  if [[ -z "$TEXT_DOMAIN" ]]; then
    printf "${RED}Error: Text domain cannot be empty.${RESET}\n"
    exit 1
  fi
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} for the translations.${RESET}\n\n" "${TEXT_DOMAIN}"

# First make sure React build is up to date
printf "${BLUE}Making sure React build is up to date in your local environment before copying...${RESET}\n"
cd "${ROOT_DIR}"/react || exit
npm install
npm run build
npm run build:css
cd "${ROOT_DIR}" || exit

printf "${GREEN}✅ React build is up to date.${RESET}\n\n"

# Clean up any previous build artifacts
printf "${BLUE}Cleaning up previous package artifacts in /tmp...${RESET}\n"
rm -rf /tmp/"${PLUGIN_NAME}" /tmp/"${PLUGIN_NAME}".zip "${PLUGIN_NAME}".zip

printf "${GREEN}✅ /tmp is clean!${RESET}\n\n"

# Copy the plugin to /tmp while excluding the EXCLUDES list
printf "${BLUE}Copying %s to /tmp...${RESET}\n" "${PLUGIN_NAME}"
rsync -a -q "${EXCLUDES[@]}" ./ /tmp/"${PLUGIN_NAME}"

printf "${GREEN}✅ Copied!${RESET}\n\n"

# Change to the temporary directory
cd /tmp/"${PLUGIN_NAME}" || exit

printf "${BLUE}Installing composer packages (production only)...${RESET}\n\n"
composer install --no-dev --optimize-autoloader

printf "\n${GREEN}✅ Packages installed for production!${RESET}\n\n"

# Strip out files that are not meant to be shipped
printf "${BLUE}Cleaning up dev-related files...${RESET}\n"
rm -rf ./composer.json ./composer.lock

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Enable extended pattern matching for glob operations like !(pattern)
printf "${BLUE}Enabling extended glob patterns...${RESET}\n"
shopt -s extglob

printf "${GREEN}✅ Glob operations are now supported!${RESET}\n\n"

# Remove everything from react folder except src and build folder
printf "${BLUE}Cleaning up React app...${RESET}\n"
cd /tmp/"${PLUGIN_NAME}"/react || exit
rm -rf ..?* .[!.]* !(src|build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Remove everything from Gutenberg block except src and build folder
printf "${BLUE}Cleaning up Gutenberg block...${RESET}\n"
cd /tmp/"${PLUGIN_NAME}"/assets/block || exit
rm -rf ..?* .[!.]* !(src|build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Ask user if they want to create a new .pot file, only needed if new
# translatable strings are added
read -p "$(printf "${BLUE}Do you want to create a new translations template (.pot)? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" == "y" ]]; then
  # Executing WP CLI with (temporarily) an unlimited memory limit
  printf "\n${BLUE}Scanning plugin and creating a new .pot file... (this may take a while)${RESET}\n"
  php -d memory_limit=-1 $(which wp) i18n make-pot "${ROOT_DIR}" "${ROOT_DIR}/assets/languages/${TEXT_DOMAIN}.pot"

  printf "${GREEN}✅ New .pot file created!${RESET}\n\n"
else
  printf "${YELLOW}Skipping .pot file creation.${RESET}\n\n"
fi

# Zip te package
printf "${BLUE}Zipping the package...${RESET}\n"
cd /tmp/ || exit
zip -rqT "${PLUGIN_NAME}".zip "${PLUGIN_NAME}"/

printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is ready.${RESET}\n\n" "${PLUGIN_NAME}"

# Ask the user if they want to retrieve translation files from
# translate.really-simple-plugins.com and save them in the packaged plugin
read -p "$(printf "${BLUE}Do you want to store translation files from translate.really-simple-plugins.com into the package? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" == "y" ]]; then
  cd "${ROOT_DIR}"/scripts || {
    printf "${RED}Error: Failed to change directory to find the translation script.${RESET}\n"
    exit 1
  }

  printf "\n${BLUE}Starting the translation script now.${RESET}\n"
  bash ./translation.sh "${PLUGIN_NAME}" "${TEXT_DOMAIN}"
fi

# Ask the user if the package need to be uploaded to translate.really-simple-plugins.com
read -p "$(printf "${BLUE}Do you want to upload the package to translate.really-simple-plugins.com? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" == "y" ]]; then
  cd "${ROOT_DIR}"/scripts || {
    printf "${RED}Error: Failed to change directory to find the upload script.${RESET}\n"
    exit 1
  }

  printf "\n${BLUE}Starting the upload script now.${RESET}\n"
  bash ./upload.sh "${PLUGIN_NAME}"
fi