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
- <details>
  <summary>Manufacturers:</summary>

  - List: http://localhost:3000/manufacturer/list
  - Create: http://localhost:3000/manufacturer/create
  </details>

- <details>
  <summary>Models:</summary>

  - List: http://localhost:3000/model/list
  - Create: http://localhost:3000/model/create
  </details>

- <details>
  <summary>Automobiles:</summary>

  - List: http://localhost:3000/automobile/list
  - Create: http://localhost:3000/automobile/create
  </details>

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

#### Views

### Sales API

- Put Sales API documentation here

## Value Objects

- Identification of value objects for each service goes here
