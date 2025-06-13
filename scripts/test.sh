#!/bin/bash

# Set current working directory to the script's directory
cd "$(dirname "$0")" || exit

# Retrieve the defined constants from the constants.sh file
source "./constants.sh"

# Extract folder name to use as plugin name
PLUGIN_NAME=${ROOT_DIR##*/}
ORIGINAL_PLUGIN_NAME=${PLUGIN_NAME}

# Get parent folder of the plugin directory
PARENT_DIR=$(dirname "${ROOT_DIR}")

# Abort if any function (except extended glob) is not installed from this script
REQUIRED_COMMANDS=(
  "rsync"
  "composer"
  "zip"
  "npm"
  "shopt"
)

# List of patterns or folders to exclude from testing package
EXCLUDES=(
  "react/node_modules"
  "assets/block/node_modules"
  "vendor"
  ".git"
  ".gitignore"
  ".wp-env.json"
  "scripts"
  ".idea"
  ".vscode"
  ".DS_Store"
  "composer.lock"
)

# Check if the required commands are installed before proceeding
for cmd in "${REQUIRED_COMMANDS[@]}"; do
  if ! command -v "$cmd" &> /dev/null; then
    printf "${RED}Error: command \"%s\" is not installed. Please install it and try again.${RESET}\n" "$cmd"
    exit 1
  fi
done

# Check if PLUGIN_NAME, ORIGINAL_PLUGIN_NAME, and PARENT_DIR are set
if [[ -z "$PLUGIN_NAME" || -z "$ORIGINAL_PLUGIN_NAME" || -z "$PARENT_DIR" ]]; then
  printf "${RED}Error: Plugin name, original plugin name, or parent directory is not set. Aborted to prevent MacOS deletion.${RESET}\n"
  exit 1
fi

# Ask user to confirm executing this script with an explanation of what it does
printf "${BLUE}This script will create a zip package of the plugin for testing purposes.${RESET}\n"
printf "${BLUE}It will rename the folder to the plugin name, install dependencies, and clean up development files. ${RESET}\n"
read -p "$(printf "${BLUE}Do you want to continue? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

# Ask the user to confirm the plugin name
printf "\n${BLUE}Detected plugin name: ${YELLOW}%s${RESET}\n" "${PLUGIN_NAME}"

# Ask the user to change the plugin name if needed
read -p "$(printf "${BLUE}Is this the correct plugin name? If not, please change it in the script. ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  read -p "$(printf "${BLUE}Please enter the correct plugin name: ${RESET}")" PLUGIN_NAME
  if [[ -z "$PLUGIN_NAME" ]]; then
    printf "${RED}Error: Plugin name cannot be empty.${RESET}\n"
    exit 1
  fi
fi

# Check if in the current directory of the script executor a folder with the
# same name as the plugin name already exists. If it does, ask the user if the
# script should remove that folder. If not, exit the script.
if [[ -d "${PARENT_DIR}/${PLUGIN_NAME}" || -f "${PARENT_DIR}/${PLUGIN_NAME}.zip" ]]; then
  read -p "$(printf "${RED}A folder or .zip file named '%s' already exists. Do you want to remove them? ${RESET}(y/n):" "${PLUGIN_NAME}")" CONFIRM
  if [[ "$CONFIRM" == "y" ]]; then
    [[ -d "${PARENT_DIR}/${PLUGIN_NAME}" ]] && rm -rf "${PARENT_DIR}/${PLUGIN_NAME}" && printf "${GREEN}✅ Removed existing folder '${YELLOW}%s${GREEN}'.${RESET}\n\n" "${PLUGIN_NAME}"
    [[ -f "${PARENT_DIR}/${PLUGIN_NAME}.zip" ]] && rm -f "${PARENT_DIR}/${PLUGIN_NAME}.zip" && printf "${GREEN}✅ Removed existing .zip file '${YELLOW}%s.zip${GREEN}'.${RESET}\n\n" "${PLUGIN_NAME}"
  else
    printf "${RED}Aborted: Existing folder or .zip file found and you chose to keep them.${RESET}\n"
    exit 1
  fi
fi

printf "${GREEN}✅ Using ${YELLOW}%s${GREEN} for the test-package of the plugin.${RESET}\n\n" "${PLUGIN_NAME}"

# First make sure React build is up to date
printf "${BLUE}Making sure React build is up to date ...${RESET}\n"
cd "${ROOT_DIR}"/react || exit
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1
npm run build:css > /dev/null 2>&1
cd "${ROOT_DIR}" || exit

printf "${GREEN}✅ React build is up to date.${RESET}\n\n"

# Secondly make sure the environment is set to 'production' in Plugin
printf "${BLUE}Setting the environment to 'production' in Plugin class for testing purposes...${RESET}\n"
# Check if the line exists first
if grep -q "define('SIMPLYBOOK_ENV'" "${ROOT_DIR}/app/Plugin.php"; then
  # Perform the actual replacement
  if sed -i '' "s/define('SIMPLYBOOK_ENV', *['\"].*['\"]);/define('SIMPLYBOOK_ENV', 'production');/" "${ROOT_DIR}/app/Plugin.php"; then
    printf "${GREEN}✅ Environment set to 'production'.${RESET}\n\n"
  else
    printf "${RED}❌ Error: sed command failed.${RESET}\n"
    exit 1
  fi
else
  printf "${RED}❌ Error: Environment line not found in Plugin.php.${RESET}\n"
  exit 1
fi

printf "${BLUE}Installing composer packages (production only)...${RESET}\n"
composer install --no-dev --optimize-autoloader > /dev/null 2>&1 || {
  printf "${RED}Error: Failed to install composer packages.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Packages installed for production for testing purposes!${RESET}\n\n"

# Enable extended pattern matching for glob operations like !(pattern)
printf "${BLUE}Enabling extended glob patterns...${RESET}\n"
shopt -s extglob || {
  printf "${RED}Error: Failed to enable extended glob patterns.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Glob operations are now supported!${RESET}\n\n"

# Remove everything from react folder except src and build folder
printf "${BLUE}Cleaning up React app...${RESET}\n"
cd "${ROOT_DIR}"/react || exit
rm -rf ..?* .[!.]* !(build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Remove everything from Gutenberg block except src and build folder
printf "${BLUE}Cleaning up Gutenberg block...${RESET}\n"
cd "${ROOT_DIR}"/assets/block || exit
rm -rf ..?* .[!.]* !(build)

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Strip out files from EXCLUDES array
printf "${BLUE}Cleaning up dev-related files...${RESET}\n"
for EXCLUDE in "${EXCLUDES[@]}"; do
  printf "${BLUE}Removing ${YELLOW}%s${BLUE}...${RESET}\n" "$EXCLUDE"
  rm -rf "${ROOT_DIR}/${EXCLUDE}"
done

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Rename the folder to the plugin name if it's different
if [[ "${ORIGINAL_PLUGIN_NAME}" != "${PLUGIN_NAME}" ]]; then
  printf "${BLUE}Renaming folder from ${YELLOW}%s${BLUE} to ${YELLOW}%s${BLUE}...${RESET}\n" "${ORIGINAL_PLUGIN_NAME}" "${PLUGIN_NAME}"
  mv "${PARENT_DIR}/${ORIGINAL_PLUGIN_NAME}" "${PARENT_DIR}/${PLUGIN_NAME}" || {
    printf "${RED}Error: Failed to rename folder.${RESET}\n"
    exit 1
  }
  printf "${GREEN}✅ Folder renamed successfully.${RESET}\n\n"
fi

# Zip the package in the current directory with the plugin name
printf "${BLUE}Zipping the package...${RESET}\n"
cd "${PARENT_DIR}" || exit
zip -rqT "${PLUGIN_NAME}".zip "${PLUGIN_NAME}"/

# Remove the renamed plugin folder (cleanup)
rm -rf "${PARENT_DIR}/${PLUGIN_NAME}"

# Remove the original plugin zip file if it exists
if [[ -f "${PARENT_DIR}/${ORIGINAL_PLUGIN_NAME}.zip" ]]; then
  rm -f "${PARENT_DIR}/${ORIGINAL_PLUGIN_NAME}.zip"
fi

printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is ready.${RESET}\n\n" "${PLUGIN_NAME}"