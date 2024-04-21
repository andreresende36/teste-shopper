#!/bin/sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
nvm install node 20.12.2