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

# Setup script specific constants
ZIP_FILE_NAME="${PLUGIN_NAME}.zip"
ZIP_FILE_PATH="/tmp/${ZIP_FILE_NAME}"

## Ask user to confirm executing this script with an explanation of what it does
printf "\n${BLUE}This script will upload the packaged plugin from your /tmp directory to the translation server .${RESET}\n"
printf "${BLUE}It will remove any existing zip file, unzip the new one and backup any existing plugin with the same name on the translation server.${RESET}\n"
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
if ssh "${SSH_LOGIN}" "rm -f ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME}"; then
  printf "${GREEN}Existing zip file found and successfully removed on the remote server.${RESET}\n\n"
else
  printf "${GREEN}No existing zip file found to remove on the remote server.${RESET}\n\n"
fi

# This step uploads the ZIP file to the remote server.
printf "${BLUE}Uploading zip file ${ZIP_FILE_PATH} to translation server...${RESET}\n"
scp "${ZIP_FILE_PATH}" "${SSH_LOGIN}":"${REMOTE_WP_CONTENT_PATH}/plugins/" || {
  printf "${RED}Error: Failed to upload the zip file.${RESET}"
  exit 1
}

# Print success message
printf "${GREEN}✅ '${YELLOW}%s${GREEN}' uploaded!${RESET}\n\n" "${ZIP_FILE_NAME}"

# Backing up existing '${PLUGIN_NAME}' folder in the plugins-backup dir.
# Only if it exists. The backup will be appended with a timestamp.
printf "${BLUE}Back-up existing plugin folder if it exists...${RESET}\n"
ssh "${SSH_LOGIN}" "mkdir -p '${REMOTE_WP_CONTENT_PATH}/plugins-backup/${PLUGIN_NAME}' && if [ -d '${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}' ]; then mv '${REMOTE_WP_CONTENT_PATH}/plugins/${PLUGIN_NAME}' '${REMOTE_WP_CONTENT_PATH}/plugins-backup/${PLUGIN_NAME}/${PLUGIN_NAME}-${TIMESTAMP}'; fi" || {
  printf "${RED}Error: Failed to execute the command to backup an existing folder.${RESET}"
}

# Print success message
printf "${GREEN}✅ Done! ${RESET}\n\n"

# Unzip the uploaded ZIP file
printf "${BLUE}Unzipping the uploaded zip file...${RESET}\n"
ssh "${SSH_LOGIN}" "unzip -q -o ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME} -d ${REMOTE_WP_CONTENT_PATH}/plugins/" || {
  printf "${RED}Error: Failed to unzip the uploaded zip file.${RESET}\n"
  exit 1
}

# Print success message
printf "${GREEN}✅ Done! ${RESET}\n\n"

# Clean up the uploaded zip file
printf "${BLUE}Cleaning up the uploaded zip file...${RESET}\n"
ssh "${SSH_LOGIN}" "rm ${REMOTE_WP_CONTENT_PATH}/plugins/${ZIP_FILE_NAME}" || {
  printf "${RED}Error: Failed to remove the uploaded zip file.${RESET}\n"
  exit 1
}

printf "${GREEN}✅ Your package '${YELLOW}%s.zip${GREEN}' is uploaded and unzipped on translate.really-simple-plugins.com.${RESET}\n\n" "${PLUGIN_NAME}"