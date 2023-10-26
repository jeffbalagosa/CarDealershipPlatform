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

- The sales microservice consists of 4 models :
  1. AutomobileVO : A Value object that gets the data from the automobiles in the inventory, this is done via a poller that pulls data every 60 seconds.
     The properties that this object contains are the "import_href", "vin", and "sold" status.
  2. Customer : A simple model that has First and Last name properties, as well as an address and phone number.
  3. Salesperson: Another straightforward model containing First and Last names, addtionally a employee id which is an integer.
  4. Sale : This model has its own "price" property but then usses the AutomobileVO's vin, as well as Customer and Salesperson models.

  The way this API works is that a Sale is recorded by providing a Customer and Salesperson and an UNSOLD Automobile(identified by its VIN).

  The automobile is sold for a listed price and the sale is then recorded.

  The unsold automobile is listed as SOLD and is no longer available for sale.

  The history of the sale is then provided in a list and can also be accessed by individual salesperson history.

  If needed, you can create a new customer or salesperson using the forms provided.

  If you wish to create a customer,salesperson, or sale, without using the provided forms feel free to utilize the insomnia requests provided in the shared resources folder under "doruk_sales".

## Value Objects

- Sales API Value Object - Automobile: A Value object that gets the data from the automobiles in the inventory, this is done via a poller that pulls data every 60 seconds.
