
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

    Open http://localhost:10001 to view your metrics dashboard



## Run tests: ##

    npm run test



## Linting
```
npm run lint .
```

----------


----------


----------


> *Tony Anyanwu*
