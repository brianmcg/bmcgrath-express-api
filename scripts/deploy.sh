#!/bin/bash

REPO_PATH="/home/azureuser/apps/bmcgrath-express-api"
NGINX_AVAILABLE_PATH="/home/azureuser/nginx/sites-available"
NGINX_ENABLED_PATH="/home/azureuser/nginx/sites-enabled"
NGINX_CONFIG_FILE="bmcgrath-express-api.conf"

function echo_box() {
  string="| ${1} |"
  length=${#string}-2
  divider="+"

  for ((i = 0; i < length; i++)); do
    divider="${divider}-"
  done

  divider="${divider}+"

  echo
  echo ${divider}
  echo ${string}
  echo ${divider}
}

function deploy () {
  . ~/.nvm/nvm.sh
  cd $REPO_PATH

  echo_box "Running git pull"
  git pull

  echo_box "Running npm install"
  npm install

  echo_box "Running npm build"
  npm run build

  echo_box "Reloading nginx"
  sudo rm "${NGINX_ENABLED_PATH}/*"
  sudo cp "config/${NGINX_CONFIG_FILE} ${NGINX_AVAILABLE_PATH}/"
  sudo ln -s "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}" "${NGINX_ENABLED_PATH}/${NGINX_CONFIG_FILE}"
  sudo service nginx reload
  sudo service nginx status
}

ssh azure "$(typeset -f); deploy"
