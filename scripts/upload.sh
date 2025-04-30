#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RESET='\033[0m'

# Get plugin name from first argument
PLUGIN_NAME="$1";
if [ -z "${PLUGIN_NAME}" ]; then
  printf "${RED}Error: Please provide the name of the plugin as the first argument of the script.${RESET}\n"
  exit 1
fi

REMOTE_WP_CONTENT_PATH="/var/www/translate.really-simple-plugins.com/public_html/wp-content"
ZIP_FILE_NAME="${PLUGIN_NAME}.zip"
ZIP_FILE_PATH="/tmp/${ZIP_FILE_NAME}"
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

## Ask user to confirm executing this script with an explanation of what it does
printf "\n${BLUE}This script will upload the packaged plugin from your /tmp folder to the translation server.${RESET}\n"
printf "${BLUE}It will remove any existing zip file on the translation server and unzip the new one.${RESET}\n"
read -p "$(printf "${BLUE}Do you want to continue? ${RESET}(y/n):")" CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  printf "${RED}Aborted${RESET}\n"
  exit 1
fi

# Check if the zip file exists
if [ ! -f "${ZIP_FILE_PATH}" ]; then
  printf "\n${RED}Aborted: Could not upload zip file. File not found!${RESET}"
  exit 1
fi

# Abort if any function is not installed for the upload process
REQUIRED_COMMANDS=(
  "scp"
)

for cmd in "${REQUIRED_COMMANDS[@]}"; do
  if ! command -v "$cmd" &> /dev/null; then
    printf "${RED}Error: command \"%s\" is not installed. Please install it and try again.${RESET}" "$cmd"
    exit 1
  fi
done

# Confirm the selected option
printf "${GREEN}Upload script started...${RESET}\n\n"

# Remove any existing zip file on the remote server
printf "${BLUE}First remove any existing zip file on the remote server...${RESET}\n"
if ssh rsp@rsp-web004.really-simple-plugins.com "rm -f ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME}"; then
  printf "${GREEN}Existing zip file found and successfully removed on the remote server.${RESET}\n\n"
else
  printf "${GREEN}No existing zip file found to remove on the remote server.${RESET}\n\n"
fi

# This step uploads the ZIP file to the remote server.
printf "${BLUE}Uploading zip file ${ZIP_FILE_PATH} to translation server...${RESET}\n"
scp "${ZIP_FILE_PATH}" rsp@rsp-web004.really-simple-plugins.com:"${REMOTE_WP_CONTENT_PATH}/plugins/" || {
  printf "${RED}Error: Failed to upload the zip file.${RESET}"
  exit 1
}

# Print success message
printf "${GREEN}✅ '${YELLOW}%s${GREEN}' uploaded!${RESET}\n\n" "${ZIP_FILE_NAME}"

# Backing up existing '${PLUGIN_NAME}' folder in the plugins-backup dir.
# Only if it exists. The backup will be appended with a timestamp.
printf "${BLUE}Back-up existing plugin folder if it exists...${RESET}\n"
ssh rsp@rsp-web004.really-simple-plugins.com "mkdir -p '${REMOTE_WP_CONTENT_PATH}/plugins-backup/${PLUGIN_NAME}' && if [ -d '${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}' ]; then mv '${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}' '${REMOTE_WP_CONTENT_PATH}/plugins-backup/${PLUGIN_NAME}/${PLUGIN_NAME}-${TIMESTAMP}'; fi" || {
  printf "${RED}Error: Failed to execute the command to backup an existing folder.${RESET}"
}

# Print success message
printf "${GREEN}✅ Done! ${RESET}\n\n"

# Unzip the uploaded ZIP file
printf "${BLUE}Unzipping the uploaded zip file...${RESET}\n"
ssh rsp@rsp-web004.really-simple-plugins.com "unzip -q -o ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME} -d ${REMOTE_WP_CONTENT_PATH}/plugins/" || {
  printf "${RED}Error: Failed to unzip the uploaded zip file.${RESET}\n"
  exit 1
}

# Print success message
printf "${GREEN}✅ Done! ${RESET}\n\n"

# Clean up the uploaded zip file
printf "${BLUE}Cleaning up the uploaded zip file...${RESET}\n"
ssh rsp@rsp-web004.really-simple-plugins.com "rm ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME}" || {
  printf "${RED}Error: Failed to remove the uploaded zip file.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is uploaded and unzipped on translate.really-simple-plugins.com.${RESET}\n\n" "${PLUGIN_NAME}"