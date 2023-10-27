# CarCar

## The premiere solution for automobile dealership management!

![Logo](./ghi/app/public/rsz_car_logo.png)

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

- React Front-End: http://localhost:3000/

**Inventory Front-End**

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

**Service and Sales Front-End**

- <details>
  <summary>Service:</summary>

  - Technician List: http://localhost:3000/technicians/list
  - Create Technician: http://localhost:3000/technicians/create
  - Appointment List: http://localhost:3000/appointments/list
  - Create Appointment: http://localhost:3000/appointments/create
  - Appointment History List: http://localhost:3000/appointments/history
  </details>

- <details>
  <summary>Sales:</summary>

  - Salesperson List: http://localhost:3000/salespeople/list
  - Create Salesperson: http://localhost:3000/salespeople/create
  - Customer List: http://localhost:3000/customer/list
  - Create Customer: http://localhost:3000/customer/create
  - Sales List: http://localhost:3000/sales/list
  - Create Sale: http://localhost:3000/sales/create
  - Sales History List: http://localhost:3000/sales/history
  </details>

**Inventory Back-End**

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

- The back-end urls and ports for the **Service** and **Sales** microservices are included in the Insomnia Exports of the [shared_resources/](./shared_resources/) folder.

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
- `get_api_url()`: to generate the href.
</details>

<details>
<summary>Appointment:</summary>

- `date_time`: utilized Django's `DateTimeField()` for obvious reasons. Formatting to and from front end was an interesting challenge.
- `reason`: made this a text field because reason entrieas could potentially be in paragraph form.
- `status`: I considered making this its own model to make **created**, **finished**, and **cancelled** its own properties. But kept it simple.
- `vin`: Separate entry from the VO vin. Mainly used to identify VIP status, search, and keep track of customer history.
- `customer`: Standard `Charfield()`. Specs didn't specify a separate first_name and last_name property. Didn't think it was required for this use case either.
- `technician`: This is a foreign key and needed it here for the form dropdown. An interesting challenge would be show a list of what technicians are working on what cars. Perhaps I'll attemp as a stretch goal.
- `get_api_url()`: to generate the href.
</details>

### Sales API

The sales microservice consists of 4 models :

<details>
<summary> AutomobileVO </summary>
  A Value object that gets the data from the automobiles in the inventory, this is done via a poller that pulls data every 60 seconds.
  The properties that this object contains are the "import_href", "vin", and "sold" status.

- `import_href` : unique href for each automobile, not utilized but can be useful
- `vin` : unique Vehicle Identification Number, used to determine each unique automobile for sales
- `sold` : A simple boolean field to determine if a automobile had been sold or not.
</details>

<details>
<summary> Customer </summary>

- `first_name` : CharField, self-explanatory
- `last_name` : CharField, self-explanatory
- `address` : CharField, takes any text, need to filter it for proper formatting in future
- `phone_number` : CharField, takes max length of 15 for international numbers or if people use hyphens or brackets or + symbols
</details>

<details>
<summary> Salesperson </summary>

- `first_name` : CharField, self-explanatory
- `last_name` : CharField, self-explanatory
- `employee_id` : Unique positive integer field, identifies each Salesperson with a unique number
</details>

<details>
<summary> Sale </summary>

- `price` : CharField, so currency symbols and decimels can be used
- `salesperson` : foreign key, uses the salesperson model to assign a salesperson for each individual sale
- `customer` : foreign key, uses the customer model to assign a customer for each individual sale
- `automobile` : foreign key, uses the AutomobileVO model to pull individual cars from inventory and assign them to a sale.
</details>

### Functionality

<details>
<summary> Sales API functionality </summary>

- The way this API works is that a Sale is recorded by providing a Customer and Salesperson and an UNSOLD Automobile(identified by its VIN).

- The automobile is sold for a listed price and the sale is then recorded.

- The unsold automobile is listed as SOLD and is no longer available for sale.

- The history of the sale is then provided in a list and can also be accessed by individual salesperson history.

- If needed, you can create a new customer or salesperson using the forms provided.

- If you wish to create a customer,salesperson, or sale, without using the provided forms feel free to utilize the insomnia requests provided in the shared resources folder under "doruk_sales".

</details>

<details>
<summary> Service API functionality </summary>

- The form to add a technician is straight forward, each field has change handlers to update state dynamically.
- Clicking the **Add Technician** initiates the **POST** request.
- I added a success message upon recieving a good response. The view functions also include `404` responses for failures.
- The form to add an appointment has a list dropdown for technicians populated by the database.
- The Appointments list has functionality to either _cancel_ or _finish_ appointments via button click. The list is dynamically filtered for new (aka _created_ status) appointments. As you click, they are removed from the appointment list.
- The Appointment history list, keeps track of all appointments regardless of status. You can search by vin to filter out specific appointments.
- Both lists show VIP status of each appointment. VIP status is flagged if the car's VIN is in our inventory database with the status of **sold**.

</details>

## Value Objects

Value Object - Automobile: A Value object that gets the data from the automobiles in the inventory, this is done via a poller that pulls data every 60 seconds.
