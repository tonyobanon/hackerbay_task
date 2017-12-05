
# Hackerbay Microservice

This project is a simple NodeJS dockerized app  that performs Jwt authentication, Json patching and image thumbnail generation. 


## Usage: ##

Clone the repository:

    git clone git@github.com:tonyobanon/hackerbay_task.git

Login to docker:

> - Open `bin/start_disposable.sh`
> - Enter you credentials here: `yes | docker login -username '' -password ''` 


Start your container:

    $ bin/start_disposable.sh


Start the application:

    node server



The following URL should be accessible after running the application:

    http://127.0.0.1:10000/v1/api-docs


## API Endpoints: ##
The endpoints can be downloaded [as a postman collection](https://drive.google.com/open?id=1BXW7F0EFvYEqDe6QoidEyJA8TaolyI_b)
> **Note:**

> - For Image thumbnail generation, open the link below in your browser 
    http://localhost:10000/v1/protected/image/resize?imageURL=https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg&token={JWT_TOKEN}




## Metrics and Telemetry: ##

Custom metric reporting is integration into this app, using StatsD and Graphite Dashboard 

![Metrics Dashbaord](https://drive.google.com/open?id=1GiE7S1f_gtqKShNz0OJSW0v1oyY4H1Qy)


    Open http://localhost:10001 to view your metrics dashboard



## Run tests: ##

    npm run test



## Linting
```
npm run lint .
```

## Development Environment

### Docker

#### Starting Containers

This project has been setup to use docker to create a development environment. The readme assumes docker version 17 installed on your system.

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
.....   0.0.0.0:10000->8080/tcp     hackerbay_web_app
.....   0.0.0.0:8125->8125/udp     	hopsoft/graphite-statsd
.....   0.0.0.0:10001->80/tcp     	hopsoft/graphite-statsd
```

This tells you that the various machines exist "locally" at 0.0.0.0 and that the exposed ports have been mapped respectively.
 
You can view your running containers by issuing the following command:

```
docker ps
```


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


### Environmental Variables

The project's environmental variables (for the development environment) are stored in a `.env` file in the project root. This file is intended for use during docker container creation.


----------


----------


----------


> *Tony Anyanwu*
