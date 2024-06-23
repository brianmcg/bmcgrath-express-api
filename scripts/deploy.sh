#!/bin/bash

function output() {
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
  echo
}

function deploy () {
  . ~/.nvm/nvm.sh
  cd "/home/azureuser/apps/bmcgrath-express-api"

  output "Running git pull"
  git pull

  output "Running npm install"
  npm install

  output "Running npm build"
  npm run build

  output "Restarting nginx"
  sudo service nginx reload
  sudo service nginx status
}

ssh azure "$(typeset -f); deploy"
