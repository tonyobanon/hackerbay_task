#!/bin/bash

# This script will stop all the docker containers needed to provide our full service
# It assumes that docker is installed and usable on the particular host machine.

echo " ----- Stopping ALL Docker Containers -----"

docker-compose -f docker-compose.yml -f docker-compose.web_app.yml stop