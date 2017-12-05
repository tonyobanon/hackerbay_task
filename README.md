# Catalog Service

This repository contains the code for the Catalog Service and indexers; a REST based http api written in nodejs for searching
through the Konga product catalog.

This project is responsible for both indexing and searching the catalog.

## Usage: ##

Set npm registry to Konga's private npm repository:

    npm set registry http://npm.igbimo.com:4873

Install the dependencies:

    npm install

Load environment variables:

    source .env

Start the application:

    node catalog.js

OR by using PM2:

    pm2 start pm2.json

PM2 is more suitable for development environment as it monitors file updates and restarts the service.

The following URL should be accessible after running the application:

    http://127.0.0.1:8080/

## Tests: ##

All tests should be added to the **/test** folder in your project. The test framework used is Mocha, and the code coverage tool is Istanbul.

The following command can be run to use the example test which should output success:

    istanbul cover _mocha -- -R spec

Note that no code coverage will be processed until code in the project is called by the test.

More information regarding tests can be found at [http://mochajs.org/](http://mochajs.org/ "Mocha Test Framework") and [http://sinonjs.org/](http://sinonjs.org/ "Sinon JS").

There is a helper method already defined inside of `package.json`, to run unit test, run `npm test`.
To run regression test, run `npm run-script regression`

## Linting
You will need to lint before creating a PR.
```
jshint .
jscs .
```
## Development Environment

### Docker

#### Starting Containers

This project has been setup to use docker to create a development environment. The readme assumes docker version 1.9.1 installed on your system.

The project contains bash scripts to simplify the interaction with docker and enable dynamic code changes. These can be found in
```
<project_root>/bin
```

To start up all the different docker containers, which will include everything specified in the various docker compose files, run the following command in the project root:

```
./bin/start_all.sh
```

The command will attempt to start up containers based on specific images. If the images cannot be found, it will be downloaded automatically.
If the project's image cannot be found, it will be built from the Dockerfile automatically.

When all is complete, you will be given a printout showing you your running containers. Part of the printout should contain something like this:
```
.....   0.0.0.0:32913->6379/tcp     catalog_redis
.....   0.0.0.0:32914->9200/tcp     catalog_elasticsearch
.....   0.0.0.0:32920->8080/tcp     catalog_web_app
```

This tells you that the various machines exist "locally" at 0.0.0.0 and that the exposed ports have been mapped to port 32913 for the redis container, 32914 for the mysql container and 32920 for the like service web app container. Again, these are examples - the actual values and machine names for your services may differ.
 
Now, if using Docker Machine you can lookup the ip address of your docker host by issuing the following command:

```
docker-machine ip default
```

Which will return the IP address of the machines where the images run. For example: ```192.168.99.100```

Therefore, from above examples, your started web-app (catalog_web_app) can be found at: ```192.168.99.100:32920```

#### Stopping Containers

To stop the docker development environment, issue the following command from the project root:

```
./bin/stop_all.sh
```

This will stop all containers related to this project.

#### Cleaning Images

To clean up built project images, run the following command from root:

```
./bin/clean.sh
```

This will stop and remove all containers associated with the relevant project images, then remove the image itself. The clean action is useful if you want the docker image to be rebuilt (for whatever reason).

#### Disposable Container

The most powerful part of docker is our disposable containers. The disposable container is an instance of your docker image, connected to all the relevant docker containers used for the service's infrastructure, in order to allow testing and dynamic changes of the code base.

To start up and connect to a disposable container instance, run this from the project root:

```
./bin/start_disposable.sh
```

This command will start up all required infrastructure containers, and build images, in order to get you to a point where you are connected inside a disposable container.

You will be connected to the /src folder inside the container. The source code is a mapping of your own source code folder on your host, so any changes to the code on the host machine will be reflected on the docker container and vice versa.

The container will also link in a running web-app container (or whatever a project requires for full regression testing) should such a container instance be running. If nothing is running, it will only connect to the infrastructure containers.


### Regression

To start up a separate instance with a clean database and Redis instance, use the following command:

```
./bin/run_regression.sh
```

This command will start up all required infrastructure containers, create a new database and populate the database with initial test data.

These containers will be destroyed after the regression test is complete.


### Environmental Variables

The project's environmental variables (for the development environment) are stored in a `.env` file in the project root. This file is intended for use during docker container creation.

Note that things like REDIS and ELASTICSEARCH IPs and Ports are handled by docker linking env vars, but should they not be linked in via docker, you can provide an alternative in this file.
