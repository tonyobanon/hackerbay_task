#!/bin/bash

# This script will start all the docker containers needed to provide our full service
# It assumes that docker is installed and usable on the particular host machine.

echo " ----- Starting all Docker Containers -----"

docker-compose -f docker-compose.yml -f docker-compose.web_app.yml up -d