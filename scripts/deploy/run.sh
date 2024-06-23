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

  echo ${divider}
  echo ${string}
  echo ${divider}
}

function deploy () {
  REPO_PATH="/home/azureuser/apps/bmcgrath-express-api"
  NGINX_AVAILABLE_PATH="/home/azureuser/nginx/sites-available"
  NGINX_ENABLED_PATH="/home/azureuser/nginx/sites-enabled"
  NGINX_CONFIG_FILE="bmcgrath-express-api.conf"

  source ~/.nvm/nvm.sh

  cd $REPO_PATH
  
  cat scripts/deploy/figlet/title
  echo

  echo_box "Running git pull"
  echo
  git checkout main
  git pull
  echo

  echo_box "Running npm install"
  npm install
  echo

  echo_box "Running npm build"
  npm run build
  echo

  echo_box "Reloading nginx"
  echo
  sudo rm -f "${NGINX_ENABLED_PATH}"/*
  sudo cp "config/nginx/${NGINX_CONFIG_FILE}" "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}"
  sudo ln -s "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}" "${NGINX_ENABLED_PATH}/${NGINX_CONFIG_FILE}"
  sudo service nginx reload
  sudo service nginx status | grep -v systemd
}

ssh azure "$(typeset -f); deploy"
