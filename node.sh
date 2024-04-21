#!/bin/sh
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install curl
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
nvm install node
sudo apt install nodejs npm