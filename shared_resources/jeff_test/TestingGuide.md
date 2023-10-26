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

```JSON
    {
      "date_time": "2024-02-14T16:19:00+00:00",
      "reason": "Oil change",
      "vin": "12345678901234567",
      "customer": "John Wick",
      "technician": 1
    }
```
