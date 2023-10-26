# Testing Guide

## Insomnia

To help ease the pain of setting up the URLs to test the API enpoints. Feel free to use the Insomnia export in this directory to test the API.

### How to import

- Open Insomnia
- Create a new project
- Create a new collection within the project
- Click on the elipses [...] at the top right of the collection.
- Choose import and follow the prompts to import the file.

## Sample Input Data

### Technicians

```JSON
    {
      "first_name": "Clark",
      "last_name": "Kent",
      "employee_id": 1
    }
```

### Service Appointments

Keep in mind that the technician id is a foreign key to the technicians table. So you will need to create a technician first.

```JSON
    {
      "date_time": "2024-02-14T16:19:00+00:00",
      "reason": "Oil change",
      "vin": "12345678901234567",
      "customer": "John Wick",
      "technician": 1
    }
```

- In order to test VIP status, you will have to input an appointment with a **VIN #** that already exists in the database.
- You will also need to update the sold status of the Automobile to `true`.
  - Navigate to `Update Automobile` in the Insomnia collection to update the sold status.
  - Here's a sample of the JSON to update the sold status.

```JSON
    {
      "sold": true
    }
```
