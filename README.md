# CarCar

## Team:

- Jeff Balagosa
  - Service Microservice
  - Front-end **list** components for Inventory Microservice.
- Doruk Hacioglu
  - Sales Microservice
  - Front-end **form** components for Inventory Microservice.

## How to run this app

- Clone the repository.
- Run `docker volume create beta-data` from the root directory.
- Run `docker-compose build` from the root directory.
- Run `docker-compose` up from the root directory.
- Navigate to http://localhost:3000/ to view the app's front end.

## Testing

- Files to fascilitate testing can be found in the [shared_resources/](./shared_resources/) directory.
  - There you will find insomnia exports.
  - Testing guides with sample data inputs.

## Diagram

![Diagram](./shared_resources/model_diagram.png)

## API Documentation

### URLs and Ports

**Front-End**

- React Front-End: http://localhost:3000/

- Manufacturers:

  - List: http://localhost:3000/manufacturer/list
  - Create: http://localhost:3000/manufacturer/create

- Models:

  - List: http://localhost:3000/model/list
  - Create: http://localhost:3000/model/create

- Automobiles:
  - List: http://localhost:3000/automobile/list
  - Create: http://localhost:3000/automobile/create

**Back-End**

- Manufacturers:

  - GET request for list of manufacturers: http://localhost:8100/api/manufacturers/
  - POST request to add manufacturer: http://localhost:8100/api/manufacturers/
  - DELETE request for individual manufacturer: http://localhost:8100/api/manufacturers/:id/
  - PUT request for updating individual manufacturer: http://localhost:8100/api/manufacturers/:id/
  - GET request for showing individual manufacturer: http://localhost:8100/api/manufacturers/:id/

- Models:

  - GET request for list of models: http://localhost:8100/api/models/
  - POST request to add models: http://localhost:8100/api/models/
  - DELETE request for individual models: http://localhost:8100/api/models/:id/
  - PUT request for updating individual models: http://localhost:8100/api/models/:id/
  - GET request for showing individual models: http://localhost:8100/api/models/:id/

- Automobiles:

  - GET request for list of automobiles: http://localhost:8100/api/automobiles/
  - POST request to add automobiles: http://localhost:8100/api/automobiles/
  - DELETE request for individual automobiles: http://localhost:8100/api/automobiles/:vin/
  - PUT request for updating individual automobiles: http://localhost:8100/api/automobiles/:vin/
  - GET request for showing individual automobiles: http://localhost:8100/api/automobiles/:vin/

### Inventory API (Optional)

- Put Inventory API documentation here. This is optional if you have time, otherwise prioritize the other services.

### Service API

- Put Service API documentation here

### Sales API

- Put Sales API documentation here

## Value Objects

- Identification of value objects for each service goes here
