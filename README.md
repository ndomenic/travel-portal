This project is intended to serve as a portal where users can upload pictures and a decription to be saved to a database. The intention is that users can add photos and descriptions while out and about travelling, and the information can later be used to create a blog-type site of the vacation.

## Docker Commands

This project makes use of Docker, and can be run in a couple different ways.

### Development

To fire up the development environment for the App, run:

`docker-compose up`

From here, the development app will be available at port 3000.

To stop the development container, run:

`docker-compose stop`

To stop and remove the devlopment container, run:

`docker-compose down`


### Production

To make this project production ready, and build the React App into minified HTML, CSS & JS, run the following command:

`docker-compose -f docker-compose-production.yml up -d`

From here, the production app will be availabe at port 80.

To stop the container, run:

`docker-compose -f docker-compose-production.yml stop`

To stop and remove the container, run:

`docker-compose -f docker-compose-production.yml down`
