#!/bin/bash

# Retrieve the defined constants from the constants.sh file
source "./constants.sh"

# Extract folder name to use as plugin name
PLUGIN_NAME=${ROOT_DIR##*/}

# Extract "Text Domain:" from the main file of the plugin
TEXT_DOMAIN=$(grep -m 1 "Text Domain:" "${ROOT_DIR}/${PLUGIN_NAME}.php" | awk -F': ' '{print $2}' | tr -d '\r' | xargs)

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

# Check if PLUGIN_NAME, ORIGINAL_PLUGIN_NAME, and PARENT_DIR are set
if [[ -z "$PLUGIN_NAME" || -z "$ROOT_DIR" ]]; then
  printf "${RED}Error: Plugin name or Root directory variables are not set. Aborted to prevent MacOS deletion.${RESET}\n"
  exit 1
fi

# Ask user to confirm executing this script with an explanation of what it does
printf "${BLUE}This script will create a zip package of the plugin for distribution.${RESET}\n"
printf "${BLUE}It will copy the plugin to your /tmp directory, install dependencies, and clean up unnecessary files. ${RESET}\n"
printf "${BLUE}After the packaging of the plugin you have the option to sync translations from- and upload the package to, the translation server.${RESET}\n"
read -p "$(printf "${BLUE}Do you want to continue? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

# Ask the user to confirm the plugin name
printf "\n${BLUE}Detected plugin name: ${YELLOW}%s${RESET}\n" "${PLUGIN_NAME}"
read -p "$(printf "${BLUE}Please confirm this is the correct plugin name. ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} for the package of the plugin.${RESET}\n\n" "${PLUGIN_NAME}"

# Ask the user to confirm the text domain
printf "${BLUE}Detected text domain: ${YELLOW}%s${RESET}\n" "${TEXT_DOMAIN}"
read -p "$(printf "${BLUE}Please confirm this is the correct text domain. ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} as the text domain.${RESET}\n\n" "${TEXT_DOMAIN}"

# Ask the user to confirm their operating system
printf "${BLUE}Detected operating system: ${YELLOW}%s${RESET}\n" "${DETECTEDOS}"
read -p "$(printf "${BLUE}Please confirm this is the correct operating system. ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} based commands.${RESET}\n\n" "${DETECTEDOS}"

# First make sure React build is up to date
printf "${BLUE}Making sure React build is up to date in your local environment before copying...${RESET}\n"
cd "${ROOT_DIR}"/react || exit
npm install
npm run build
npm run build:css
cd "${ROOT_DIR}" || exit

printf "${GREEN}✅ React build is up to date.${RESET}\n\n"

# Secondly make sure the environment is set to 'production' in Plugin
printf "${BLUE}Setting the environment to 'production' in Plugin class...${RESET}\n"
# Check if the line exists first
if grep -q "define('SIMPLYBOOK_ENV'" "${ROOT_DIR}/app/Plugin.php"; then

  if [[ $DETECTEDOS == "OSX" ]]; then
    sed -i '' "s/define('SIMPLYBOOK_ENV', *['\"].*['\"]);/define('SIMPLYBOOK_ENV', 'production');/" "${ROOT_DIR}/app/Plugin.php"
  else
    sed -i "s/define('SIMPLYBOOK_ENV', *['\"].*['\"]);/define('SIMPLYBOOK_ENV', 'production');/" "${ROOT_DIR}/app/Plugin.php"
  fi

  # Perform the actual replacement
  if [[ $? -eq 0 ]]; then
    printf "${GREEN}✅ Environment set to 'production'.${RESET}\n\n"
  else
    printf "${RED}❌ Error: sed command failed.${RESET}\n"
    exit 1
  fi
else
  printf "${RED}❌ Error: Environment line not found in Plugin.php.${RESET}\n"
  exit 1
fi

# Clean up any previous build artifacts
printf "${BLUE}Cleaning up previous package artifacts in /tmp...${RESET}\n"
rm -rf /tmp/"${PLUGIN_NAME}" /tmp/"${PLUGIN_NAME}".zip "${PLUGIN_NAME}".zip

printf "${GREEN}✅ /tmp is clean!${RESET}\n\n"

# Copy the plugin to /tmp while excluding the EXCLUDES list
printf "${BLUE}Copying %s to /tmp...${RESET}\n" "${PLUGIN_NAME}"
rsync -a -q "${EXCLUDES[@]}" ./ /tmp/"${PLUGIN_NAME}" || {
  printf "${RED}Error: Failed to copy plugin to /tmp.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Copied!${RESET}\n\n"

# Change to the temporary directory
cd /tmp/"${PLUGIN_NAME}" || exit

printf "${BLUE}Installing composer packages (production only)...${RESET}\n\n"
composer install --no-dev --optimize-autoloader || {
  printf "${RED}Error: Failed to install composer packages.${RESET}\n"
  exit 1
}

printf "\n${GREEN}✅ Packages installed for production!${RESET}\n\n"

# Strip out files that are not meant to be shipped (composer.json should be kept)
printf "${BLUE}Cleaning up dev-related files...${RESET}\n"
rm -rf ./composer.lock || {
  printf "${RED}Error: Failed to remove dev-related files.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Enable extended pattern matching for glob operations like !(pattern)
printf "${BLUE}Enabling extended glob patterns...${RESET}\n"
shopt -s extglob || {
  printf "${RED}Error: Failed to enable extended glob patterns.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Glob operations are now supported!${RESET}\n\n"

# Remove everything from react folder except src and build folder
printf "${BLUE}Cleaning up React app...${RESET}\n"
cd /tmp/"${PLUGIN_NAME}"/react || exit
rm -rf ..?* .[!.]* !(build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Remove everything from Gutenberg block except src and build folder
printf "${BLUE}Cleaning up Gutenberg block...${RESET}\n"
cd /tmp/"${PLUGIN_NAME}"/assets/block || exit
rm -rf ..?* .[!.]* !(build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Ask user if they want to create a new .pot file, only needed if new
# translatable strings are added
read -p "$(printf "${BLUE}Do you want to create a new translations template (.pot)? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" == "y" ]]; then
  # Executing WP CLI with (temporarily) an unlimited memory limit
  printf "\n${BLUE}Scanning plugin and creating a new .pot file... (this may take a while)${RESET}\n"
  php -d memory_limit=-1 $(which wp) i18n make-pot "${ROOT_DIR}" "${ROOT_DIR}/assets/languages/${TEXT_DOMAIN}.pot" || {
    printf "${RED}Error: Failed to create .pot file.${RESET}\n"
    exit 1
  }

  printf "${GREEN}✅ New .pot file created!${RESET}\n\n"
else
  printf "${ORANGE}Skipping .pot file creation.${RESET}\n\n"
fi

# Zip te package
printf "${BLUE}Zipping the package...${RESET}\n"
cd /tmp/ || exit
zip -rqT "${PLUGIN_NAME}".zip "${PLUGIN_NAME}"/

printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is ready.${RESET}\n\n" "${PLUGIN_NAME}"

# @internal This part is commented out because storing translation files in the
# packaged plugin is not needed for WordPress.org plugins.

# Ask the user if they want to retrieve translation files from
# translate.really-simple-plugins.com and save them in the packaged plugin
#read -p "$(printf "${BLUE}Do you want to store translation files from translate.really-simple-plugins.com into the package? ${RESET}(y/n):")" CONFIRM
#if [[ "$CONFIRM" == "y" ]]; then
#  cd "${ROOT_DIR}"/scripts || {
#    printf "${RED}Error: Failed to change directory to find the translation script.${RESET}\n"
#    exit 1
#  }
#
#  printf "\n${BLUE}Starting the translation script now.${RESET}\n"
#  bash ./translation.sh "${PLUGIN_NAME}" "${TEXT_DOMAIN}"
#fi

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

# State that the script has finished
printf "\n${GREEN}✅ Finished!${RESET}\n"