#!/bin/bash

# Retrieve the defined constants from the constants.sh file
source "./constants.sh"

# Get plugin name from first argument or ask the user to confirm the detected
# plugin name
PLUGIN_NAME="$1";
if [ -z "${PLUGIN_NAME}" ]; then
  PLUGIN_NAME=${ROOT_DIR##*/}

  printf "\n${BLUE}Detected plugin name: ${YELLOW}%s${RESET}\n" "${PLUGIN_NAME}"
  read -p "$(printf "${BLUE}Please confirm this is the correct plugin name. ${RESET}(y/n):")" CONFIRM
  if [[ "$CONFIRM" != "y" ]]; then
    printf "${RED}Aborted${RESET}\n"
    exit 1
  fi

fi

# Get text domain from the second argument or ask the user to confirm the
# detected text domain
TEXT_DOMAIN="$2";
if [ -z "${TEXT_DOMAIN}" ]; then
  TEXT_DOMAIN=$(grep -m 1 "Text Domain:" "${ROOT_DIR}/${PLUGIN_NAME}.php" | awk -F': ' '{print $2}' | xargs)

  printf "${BLUE}Detected text domain: ${YELLOW}%s${RESET}\n" "${TEXT_DOMAIN}"
  read -p "$(printf "${BLUE}Please confirm this is the correct text domain. ${RESET}(y/n):")" CONFIRM
  if [[ "$CONFIRM" != "y" ]]; then
    printf "${RED}Aborted${RESET}\n\n"
    exit 1
  fi

fi

# Setup script specific constants
PACKAGE_PATH="/tmp/${PLUGIN_NAME}"

# Ask user to confirm executing this script with an explanation of what it does
printf "\n${BLUE}This script will download the translations from the translations server and save them in your unzipped package.${RESET}\n"
printf "${BLUE}The unzipped package will be sought in your /tmp directory.${RESET}\n"
read -p "$(printf "${BLUE}Do you want to continue? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n\n"
  exit 1
fi

# Check if the required package directory exist
if [[ ! -d "${PACKAGE_PATH}" ]]; then
  printf "${RED}Error: Plugin package not found: "${PACKAGE_PATH}"${RESET}\n"
  exit 1
fi

# Confirm the selected option
printf "\n${GREEN}Translation script started...${RESET}\n\n"

# Remove everything from the language folder in the package except the
# index.php and .pot files
printf "${BLUE}Cleaning up language folder of package, just to be sure...${RESET}\n"
find "${PACKAGE_PATH}/${LANGUAGE_PATH}" -type f ! -name 'index.php' ! -name '*.pot' -delete || {
  printf "${RED}Error: Failed to remove files from the language folder.${RESET}\n\n"
  exit 1
}

printf "${GREEN}✅ Clean!${RESET}\n\n"

# Download .po files from the translation server and save them in the language
# path of the package
printf "${BLUE}Downloading .po files...${RESET}\n"
scp "${SSH_LOGIN}":"${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}/${LANGUAGE_PATH}/*.po" "${PACKAGE_PATH}/${LANGUAGE_PATH}" > /dev/null 2>&1 || {
  printf "${RED}Error: Failed to download .po files.${RESET}\n\n"
  exit 1
}

# Output amount of files downloaded for information
FILE_COUNT=$(ssh "${SSH_LOGIN}" "ls -1 ${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}/${LANGUAGE_PATH}/*.po 2>/dev/null | wc -l")
printf "${GREEN}✅ Downloaded ${FILE_COUNT} .po file%s!${RESET}\n\n" "$( [ "$FILE_COUNT" -eq 1 ] && echo "" || echo "s" )"

# Changing directory to the language path of the package
printf "${BLUE}Changing directory to ${PACKAGE_PATH}/${LANGUAGE_PATH}${RESET}\n"
cd "${PACKAGE_PATH}/${LANGUAGE_PATH}" || {
  printf "${RED}Error: Failed to change directory.${RESET}\n\n"
  exit 1
}

printf "${GREEN}✅ Current directory changed.${RESET}\n\n"

# Use WP-CLI to create .json files from the .po files
printf "${BLUE}Creating .json files from the .po files...${RESET}\n"
wp i18n make-json ./*.po > /dev/null 2>&1 || {
  printf "${RED}Error: Failed to create .json files from the .po files.${RESET}\n\n"
  exit 1
}

printf "${GREEN}✅ Done!${RESET}\n\n"

# Use WP-CLI to create .mo files from the .po files
printf "${BLUE}Creating .mo files from the .po files...${RESET}\n"
wp i18n make-mo ./*.po > /dev/null 2>&1 || {
  printf "${RED}Error: Failed to create .mo files from the .po files.${RESET}\n\n"
  exit 1
}

printf "${GREEN}✅ Done!${RESET}\n\n"

# Remove old .zip package if it exists and .zip the updated package
printf "${BLUE}Removing old .zip package if it exists...${RESET}\n"
if [ -f "/tmp/${PLUGIN_NAME}.zip" ]; then
  rm "/tmp/${PLUGIN_NAME}.zip"
  printf "${GREEN}✅ Old .zip package removed.${RESET}\n\n"
else
  printf "${GREEN}✅ No old .zip package found to remove.${RESET}\n\n"
fi

# Zip the updated package if possible
printf "${BLUE}Zipping the updated package...${RESET}\n"

# Change directory to /tmp first
cd /tmp/ || {
  printf "${RED}Error: Failed to change directory to find the package.${RESET}\n\n"
  exit 1
}

# Zip the package
zip -rqT "${PLUGIN_NAME}.zip" "${PLUGIN_NAME}"/ > /dev/null 2>&1 || {
  printf "${RED}Error: Failed to zip the updated package.${RESET}\n\n"
  exit 1
}

# Success message
printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is ready.${RESET}\n\n" "${PLUGIN_NAME}"