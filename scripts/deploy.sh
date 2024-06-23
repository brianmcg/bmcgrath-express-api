#!/bin/bash

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
  APP_PATH="/home/azureuser/apps/bmcgrath-express-api"
  NGINX_AVAILABLE_PATH="/home/azureuser/nginx/sites-available"
  NGINX_ENABLED_PATH="/home/azureuser/nginx/sites-enabled"
  NGINX_CONFIG_FILE="bmcgrath-express-api.conf"
  TIMESTAMP=`date +%s`

  source ~/.nvm/nvm.sh
  
  figlet "Deploying App"
  echo

  echo_box "Fetching latest code"
  echo

  if test -d "${APP_PATH}/repo"; then
    cd "${APP_PATH}/repo"
    git stash
    git checkout main
    git pull
  else
    git clone git@github.com:brianmcg/bmcgrath-express-api.git "${APP_PATH}/repo"
    cp -r "${APP_PATH}/shared/." "${APP_PATH}/repo/"
    cd "${APP_PATH}/repo"
  fi
  
  echo
  echo_box "Installing dependencies"
  npm install
  echo

  echo_box "Running build"
  echo
  ./node_modules/webpack/bin/webpack.js --env release=${TIMESTAMP}

  rm -f "${APP_PATH}/current"
  sudo ln -s "${APP_PATH}/releases/${TIMESTAMP}" "${APP_PATH}/current"
  sudo ln -s "${APP_PATH}/repo/node_modules" "${APP_PATH}/current/node_modules"

  echo

  echo_box "Reloading nginx"
  echo
  sudo rm -f "${NGINX_ENABLED_PATH}"/*
  sudo cp "config/${NGINX_CONFIG_FILE}" "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}"
  sudo ln -s "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}" "${NGINX_ENABLED_PATH}/${NGINX_CONFIG_FILE}"
  sudo service nginx reload
  sudo service nginx status | grep -v systemd
}

ssh azure "$(typeset -f); deploy"
