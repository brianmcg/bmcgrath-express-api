#!/bin/bash

function echo_box() {
  content="| ${1} |"
  length=${#content}-2
  divider="+"

  for ((i = 0; i < length; i++)); do
    divider="${divider}-"
  done

  divider="${divider}+"

  echo ${divider}
  echo ${content}
  echo ${divider}
}

function deploy () {
  APP_PATH="/home/azureuser/apps/bmcgrath-express-api"
  NGINX_AVAILABLE_PATH="/home/azureuser/nginx/sites-available"
  NGINX_ENABLED_PATH="/home/azureuser/nginx/sites-enabled"
  NGINX_CONFIG_FILE="bmcgrath-express-api.conf"
  TIMESTAMP=`date +%s`
  KEEP_RELEASES=5

  source ~/.nvm/nvm.sh
  
  figlet "Deploying App"
  echo

  #-------------------#
  # Fetch latest code #
  #-------------------#
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

  #----------------------#
  # Install dependencies #
  #----------------------#
  echo_box "Installing dependencies"
  npm install
  echo

  #-----------#
  # Run build #
  #-----------#
  echo_box "Running build"
  echo
  webpack --env release=${TIMESTAMP}
  echo

  #----------#
  # Clean up #
  #----------#
  echo_box "Cleaning up"
  npm prune --omit=dev
  node-prune node_modules | sed -r "s/\x1B\[([0-9]{1,3}(;[0-9]{1,2};?)?)?[mGK]//g"
  clean-modules --yes
  rm -f "${APP_PATH}/current"
  sudo ln -s "${APP_PATH}/releases/${TIMESTAMP}" "${APP_PATH}/current"
  sudo ln -s "${APP_PATH}/repo/node_modules" "${APP_PATH}/current/node_modules"

  INDEX=0

  for DIR in `ls -t ${APP_PATH}/releases`; do
    if [ $INDEX -ge $KEEP_RELEASES ]; then
      rm -rf "${APP_PATH}/releases/${DIR}" -v
    fi
    INDEX=$((INDEX + 1))
  done

  echo

  #---------------#
  # Reoload nginx #
  #---------------#
  echo_box "Reloading nginx"
  echo
  sudo rm -f "${NGINX_ENABLED_PATH}"/*
  sudo cp "config/${NGINX_CONFIG_FILE}" "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}"
  sudo ln -s "${NGINX_AVAILABLE_PATH}/${NGINX_CONFIG_FILE}" "${NGINX_ENABLED_PATH}/${NGINX_CONFIG_FILE}"
  sudo service nginx status | grep -v systemd
  echo

  figlet "Finished"
  echo
}

ssh azure "$(typeset -f); deploy"
