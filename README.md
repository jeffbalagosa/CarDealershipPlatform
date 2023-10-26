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

- <details>
  <summary>Automobiles:</summary>

  - List: http://localhost:3000/automobile/list
  - Create: http://localhost:3000/automobile/create
  <details>

**Back-End**

- <details>
  <summary>Manufacturers:</summary>

  - GET request for list of manufacturers: http://localhost:8100/api/manufacturers/
  - POST request to add manufacturer: http://localhost:8100/api/manufacturers/
  - DELETE request for individual manufacturer: http://localhost:8100/api/manufacturers/:id/
  - PUT request for updating individual manufacturer: http://localhost:8100/api/manufacturers/:id/
  - GET request for showing individual manufacturer: http://localhost:8100/api/manufacturers/:id/
  </details>

- <details>
  <summary>Models:</summary>

  - GET request for list of models: http://localhost:8100/api/models/
  - POST request to add models: http://localhost:8100/api/models/
  - DELETE request for individual models: http://localhost:8100/api/models/:id/
  - PUT request for updating individual models: http://localhost:8100/api/models/:id/
  - GET request for showing individual models: http://localhost:8100/api/models/:id/
  </details>

- <details>
  <summary>Automobiles:</summary>

  - GET request for list of automobiles: http://localhost:8100/api/automobiles/
  - POST request to add automobiles: http://localhost:8100/api/automobiles/
  - DELETE request for individual automobiles: http://localhost:8100/api/automobiles/:vin/
  - PUT request for updating individual automobiles: http://localhost:8100/api/automobiles/:vin/
  - GET request for showing individual automobiles: http://localhost:8100/api/automobiles/:vin/
  </details>

### Inventory API (Optional)

- Put Inventory API documentation here. This is optional if you have time, otherwise prioritize the other services.

### Service API

#### Models

<details>
<summary>AutomobileVO:</summary>

- `import_href`: Didn't really need to use this, but handy to have there in case I did.
- `vin`: Primarily used to determin VIP Status of Customers.
- `sold`: Also, primarily used to determin VIP Status of Customers.
</details>

<details>
<summary>Technician:</summary>

- `first_name`: Standard character field. If I had more time to refactor, I'd reduce the character size. 200 is probably overkill.
- `last_name`: Standard character field. Same as above, if I had more time to refactor, I'd reduce the character size. 200 is probably overkill.
- `employee_id`: Standard character field. Per project specs, it needs to be there, but I think a better way would be to reference the auto generated database `id`. Less manual entry for the user, numbers would be sequential and unique
- `get_api_url()`: to generate the href
</details>

<details>
<summary>Appointment:</summary>

- `date_time`: utilized Django's `DateTimeField()` for obvious reasons. Formatting to and from front end was an interesting challenge.
- `reason`: made this a text field because reason entrieas could potentially be in paragraph form.
- `status`: I considered making this its own model to make **created**, **finished**, and **cancelled** its own properties. But kept it simple.
- `vin`: Separate entry from the VO vin. Mainly used to identify VIP status, search, and keep track of customer history.
- `customer`: Standard `Charfield()`. Specs didn't specify a separate first_name and last_name property. Didn't think it was required for this use case either.
- `technician`: This is a foreign key and needed it here for the form dropdown. An interesting challenge would be show a list of what technicians are working on what cars. Perhaps I'll attemp as a stretch goal.
- `get_api_url()`: to generate the href
</details>

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
