#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RESET='\033[0m' # Reset color

# Determine the root directory of the project
ROOT_DIR=$(realpath "$(dirname "$0")/..")

# Extract folder name to use as plugin name
PLUGIN_NAME=${ROOT_DIR##*/}

# Extract "Text Domain:" from readme.txr in root
TEXT_DOMAIN=$(grep -m 1 "Text Domain:" "${ROOT_DIR}/readme.txt" | awk '{print $3}')

# todo - ask executor to confirm they want to execute this script with an explanation of what it does

#Ask the user to confirm or set the text domain
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