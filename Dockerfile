# Use the predefined node base image for this module.
FROM node:6.2.0

# create the log directory
RUN mkdir -p /var/log/applications/hackerbay_service

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src

# Copy from cache unless the package.json file has changed
COPY ./package.json /src

# Install node dependencies
RUN npm install

# Specific installations required by bamboo and test automation - hence not included in npm install above.
RUN npm install jshint-junit-reporter mocha-bamboo-reporter

RUN npm install -g forever@0.14.2

# Copy entire file to docker
COPY . /src

# For development environment, we want to use forever to keep the code running
RUN touch .foreverignore
RUN echo ".git/*" >> .foreverignore
RUN echo "node_modules/*" >> .foreverignore
RUN cat .gitignore >> .foreverignore

# Map a volume for the log files and add a volume to override the code
VOLUME ["/src", "/var/log/applications/hackerbay_service"]

# Expose web service and nodejs debug port
EXPOSE 8080 8585 9615

CMD ["node", "server.js"]