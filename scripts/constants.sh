# This file is used to define constants and variables for the scripts
# used in the plugin development process. Do not run this file directly.

# Some color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
ORANGE='\033[0;91m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
RESET='\033[0m' # Reset color

# Determine some paths
ROOT_DIR=$(realpath "$(dirname "$0")/..")
LANGUAGE_PATH="assets/languages"

# Remote server details
SSH_USER="rsp"
SSH_HOST="rsp-web004.really-simple-plugins.com"
SSH_LOGIN="${SSH_USER}@${SSH_HOST}"
REMOTE_PUBLIC_PATH="/var/www/translate.really-simple-plugins.com/public_html"
REMOTE_WP_CONTENT_PATH="${REMOTE_PUBLIC_PATH}/wp-content"

# Mapped main languages to their respective secondary languages
MAPPED_LANGUAGES=(
  "nl_NL:nl_BE"
  "fr_FR:fr_BE fr_CA"
  "de_DE:de_CH_informal de_AT"
  "de_DE_formal:de_CH"
  "en_GB:en_NZ en_AU"
  "es_ES:es_EC es_MX es_CO es_VE es_CL es_CR es_GT es_HN es_PE es_PR es_UY es_AR es_DO"
)

# A timestamp indeed
TIMESTAMP=$(date +"%Y%m%d%H%M%S")

# Detecting OS for sed command
DETECTEDOS=
case "$OSTYPE" in
  solaris*) DETECTEDOS="SOLARIS" ;;
  darwin*)  DETECTEDOS="OSX" ;;
  linux*)   DETECTEDOS="LINUX" ;;
  bsd*)     DETECTEDOS="BSD" ;;
  msys*)    DETECTEDOS="WINDOWS" ;;
  cygwin*)  DETECTEDOS="WINDOWS" ;;
  *)        DETECTEDOS="unknown: $OSTYPE" ;;
esac