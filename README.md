# CarCar

![Logo](./shared_resources/CarCarLogo.png)

## Table of Contents

- [CarCar](#carcar)
  - [How to run this app](#how-to-run-this-app)
  - [Testing](#testing)
  - [Design Diagram](#design-diagram)
  - [Inventory Microservice API Documentation](#inventory-microservice-api-documentation)
    - [Vehicle Manufacturers](#vehicle-manufacturers)
    - [Vehicle Models](#vehicle-models)
    - [Automobile information](#automobile-information)
  - [Automobile Service Microservice API Documentation](#automobile-service-microservice-api-documentation)
    - [Technicians](#technicians)
    - [Appointments](#appointments)
  - [Automobile Sales API Documentation](#automobile-sales-api-documentation)
    - [Salespeople](#salespeople)
    - [Customers](#customers)
    - [Sales](#sales)
  - [Models](#models)
    - [Automobile Service Microservice](#automobile-service-microservice)
    - [Automobile Sales Microservice](#automobile-sales-microservice)
  - [Engineering Team](#engineering-team)

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

## Design Diagram

![Diagram](./shared_resources/model_diagram.png)

## Inventory Microservice API Documentation

### Vehicle Manufacturers

Endpoints for the manufacturers API are as follows:

| Action                         | Method | URL                                          |
| ------------------------------ | ------ | -------------------------------------------- |
| List mnaufacturers             | GET    | http://localhost:8100/api/manufacturers/     |
| Create a manufacturer          | POST   | http://localhost:8100/api/manufacturers/     |
| Get a specific manufacturer    | GET    | http://localhost:8100/api/manufacturers/:id/ |
| Update a specific manufacturer | PUT    | http://localhost:8100/api/manufacturers/:id/ |
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating and updating a manufacturer requires only the manufacturer's name.

```JSON
{
  "name": "Chrysler"
}
```

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

```JSON
{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}
```

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

```JSON
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

</details>

### Vehicle Models

Endpoints for the models API are as follows:

| Action                  | Method | URL                                   |
| ----------------------- | ------ | ------------------------------------- |
| List models             | GET    | http://localhost:8100/api/models/     |
| Create a model          | POST   | http://localhost:8100/api/models/     |
| Get a specific model    | GET    | http://localhost:8100/api/models/:id/ |
| Update a specific model | PUT    | http://localhost:8100/api/models/:id/ |
| Delete a specific model | DELETE | http://localhost:8100/api/models/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating a model requires the following fields:

```JSON
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}
```

Updating a model requires the following fields.:

_Note: It is not possible to update a vehicle model's manufacturer._

```JSON
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

```JSON
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

Getting a list of vehicle models returns a list of the detail information with the key "models".

```JSON
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

</details>

### Automobile information

Endpoints for the automobiles API are as follows:

_Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile._

| Action                       | Method | URL                                         |
| ---------------------------- | ------ | ------------------------------------------- |
| List automobiles             | GET    | http://localhost:8100/api/automobiles/      |
| Create an automobile         | POST   | http://localhost:8100/api/automobiles/      |
| Get a specific automobile    | GET    | http://localhost:8100/api/automobiles/:vin/ |
| Update a specific automobile | PUT    | http://localhost:8100/api/automobiles/:vin/ |
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/:vin/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating an automobile requires the following fields:

```JSON
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```

As noted, you query an automobile by its VIN. For example, you would use the URL

`http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/`

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

```JSON
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}
```

You can update the color, year, and sold status of an automobile.

```JSON
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```

Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

```JSON
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```

</details>

## Automobile Service Microservice API Documentation

### Technicians

Endpoints for the technicians API are as follows:

| Action                       | Method | URL                                        |
| ---------------------------- | ------ | ------------------------------------------ |
| List technicians             | GET    | http://localhost:8080/api/technicians/     |
| Create a technician          | POST   | http://localhost:8080/api/technicians/     |
| Delete a specific technician | DELETE | http://localhost:8080/api/technicians/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating a technician requires the following fields:

```JSON
    {
      "first_name": "Clark",
      "last_name": "Kent",
      "employee_id": 1
    }
```

The return value of `Create a technician` is the technician's information.

```JSON
{
  "first_name": "Clark",
  "last_name": "Kent",
  "employee_id": 1,
  "system_id": 1
}
```

The return value `List of technicians` is a dictionary with the key "technicians" set to a list of technicians.

```JSON
{
	"technicians": [
		{
			"first_name": "David",
			"last_name": "Brown",
			"employee_id": "001",
			"system_id": 1
		}
	]
}
```

The return value of `Delete a specific technician` is a dictionary with the key "deleted" set to true.

```JSON
{
	"deleted": true
}
```

</details>

### Appointments

Endpoints for the appointments API are as follows:

| Action                               | Method | URL                                               |
| ------------------------------------ | ------ | ------------------------------------------------- |
| List appointments                    | GET    | http://localhost:8080/api/appointments/           |
| Create an appointment                | POST   | http://localhost:8080/api/appointments/           |
| Delete a specific appointment        | DELETE | http://localhost:8080/api/appointments/:id/       |
| Set appointment status to "canceled" | PUT    | http://localhost:8080/api/appointments/:id/cancel |
| Set appointment status to "finished" | PUT    | http://localhost:8080/api/appointments/:id/finish |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating an appointment requires the following fields:

_Keep in mind that `technician` is a foreign key to the technicians table. So you will need to create a technician first._

```JSON
    {
      "date_time": "2024-02-14T16:19:00+00:00",
      "reason": "Oil change",
      "vin": "12345678901234567",
      "customer": "John Wick",
      "technician": 1
    }
```

The return value of `Create an appointment` is the appointment's information.

```JSON
{
	"id": 4,
	"date_time": "2024-02-14T16:19:00+00:00",
	"reason": "Oil change",
	"status": "created",
	"vin": "12345678901234567",
	"customer": "John Wick",
	"technician": "David Brown"
}
```

The return value `List of appointments` is a dictionary with the key "appointments" set to a list of appointments.

```JSON
{
	"appointments": [
		{
			"id": 4,
			"date_time": "2024-02-14T16:19:00+00:00",
			"reason": "Oil change",
			"status": "created",
			"vin": "12345678901234567",
			"customer": "John Wick",
			"technician": "David Brown"
		}
	]
}
```

The return value of `Delete a specific appointment` is a dictionary with the key "deleted" set to true.

```JSON
{
  "deleted": true
}
```

The return value of `Set appointment status to "canceled"` is a dictionary with the appointment's information with the key "status" set to "cancelled".

```JSON
{
	"id": 5,
	"date_time": "2022-01-04T10:00:00+00:00",
	"reason": "Engine tune-up",
	"status": "cancelled",
	"vin": "12345678901234570",
	"customer": "Samus Aran",
	"technician": 5
}
```

The return value of `Set appointment status to "finished"` is a dictionary with the appointment's information with the key "status" set to "finished".

```JSON
{
	"id": 8,
	"date_time": "2022-01-04T10:00:00+00:00",
	"reason": "Engine tune-up",
	"status": "finished",
	"vin": "13345678901234580",
	"customer": "Samush Arand",
	"technician": 6
}
```

</details>

## Automobile Sales API Documentation

### Salespeople

Endpoints for the salespeople API are as follows:

| Action                        | Method | URL                                        |
| ----------------------------- | ------ | ------------------------------------------ |
| List salespeople              | GET    | http://localhost:8090/api/salespeople/     |
| Create a salesperson          | POST   | http://localhost:8090/api/salespeople/     |
| Delete a specific salesperson | DELETE | http://localhost:8090/api/salespeople/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating a salesperson requires the following fields:

```JSON
{
  "first_name": "Albus",
  "last_name": "Dumbledore",
  "employee_id": 1
}
```

The return value of creating a salesperson is the salesperson's information.

```JSON
{
	"first_name": "Albus",
	"last_name": "Dumbledore",
	"employee_id": 1,
	"id": 1
}
```

The return value of listing salespeople is a dictionary with the key "salespersons" set to a list of salespeople.

```JSON
{
	"salespersons": [
		{
			"first_name": "Albus",
			"last_name": "Dumbledore",
			"employee_id": 1,
			"id": 1
		}
	]
}
```

The return value of deleting a salesperson is a dictionary with the key "deleted" set to true.

```JSON
{
  "deleted": true
}
```

</details>

### Customers

Endpoints for the customers API are as follows:

| Action                     | Method | URL                                      |
| -------------------------- | ------ | ---------------------------------------- |
| List customers             | GET    | http://localhost:8090/api/customers/     |
| Create a customer          | POST   | http://localhost:8090/api/customers/     |
| Delete a specific customer | DELETE | http://localhost:8090/api/customers/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating a customer requires the following fields:

```JSON
{
  "first_name": "Harry",
  "last_name": "Potter",
  "address": "4 Privet Drive",
  "phone_number" : "1231231234"
}
```

The return value of creating a customer is the customer's information.

```JSON
{
  "first_name": "Harry",
  "last_name": "Potter",
  "address": "4 Privet Drive",
  "phone_number": "1231231234",
  "id": 1
}
```

The return value of listing customers is a dictionary with the key "customers" set to a list of customers.

```JSON
{
	"customers": [
		{
			"first_name": "Ham",
			"last_name": "Cheese",
			"address": "1234 fridge street",
			"phone_number": "1231231234",
			"id": 1
		}
	]
}
```

The return value of deleting a customer is a dictionary with the key "deleted" set to true.

```JSON
{
  "deleted": true
}
```

</details>

### Sales

Endpoints for the sales API are as follows:

| Action                 | Method | URL                                  |
| ---------------------- | ------ | ------------------------------------ |
| List sales             | GET    | http://localhost:8090/api/sales/     |
| Create a sale          | POST   | http://localhost:8090/api/sales/     |
| Delete a specific sale | DELETE | http://localhost:8090/api/sales/:id/ |

<details>
<summary>Sample JSON Inputs and Outputs</summary>

Creating a sale requires the following fields:

_Note: The salesperson and customer are referenced by their "id"s , additionally you must use an automobile VIN from the inventory API._

```JSON
    {
      "salesperson": "1",
      "customer": "1",
      "automobile": "VIN",
      "price": "40000"
    }
```

The return value of creating a sale is the sale's information.

```JSON
{
	"price": "40000",
	"customer": {
		"first_name": "Ham",
		"last_name": "Cheese",
		"address": "1234 fridge street",
		"phone_number": "1231231234",
		"id": 1
	},
	"salesperson": {
		"first_name": "Albus",
		"last_name": "Dumbledore",
		"employee_id": 1,
		"id": 1
	},
	"automobile": {
		"vin": "1C3CC5FB2AN120174",
		"import_href": "/api/automobiles/1C3CC5FB2AN120174/"
	},
	"id": 1
}
```

list sales returns a dictionary with the key "sales" set to a list of sales.

```JSON
{
	"sales": [
		{
			"price": "40000",
			"customer": {
				"first_name": "Ham",
				"last_name": "Cheese",
				"address": "1234 fridge street",
				"phone_number": "1231231234",
				"id": 1
			},
			"salesperson": {
				"first_name": "Albus",
				"last_name": "Dumbledore",
				"employee_id": 1,
				"id": 1
			},
			"automobile": {
				"vin": "1C3CC5FB2AN120174",
				"import_href": "/api/automobiles/1C3CC5FB2AN120174/"
			},
			"id": 1
		}
	]
}
```

The return value of deleting a sale is a dictionary with the key "deleted" set to true.

```JSON
{
  "deleted": true
}
```

</details>

## Models

### Automobile Service Microservice

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

### Automobile Sales Microservice

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

## Engineering Team

- Jeff Balagosa
  - Service Microservice
  - Front-end **list** components for Inventory Microservice.
- Doruk Hacioglu
  - Sales Microservice
  - Front-end **form** components for Inventory Microservice.
