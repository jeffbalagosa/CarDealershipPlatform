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

### Salesperson

```JSON
    {
      "first_name": "Albus",
      "last_name": "Dumbledore",
      "employee_id": 1
    }
```

### Customer

```JSON
    {
      "first_name": "Harry",
      "last_name": "Potter",
      "address": "4 Privet Drive",
      "phone_number" : "1231231234"
    }
```
### Sale


```JSON
    {
      "salesperson": "1",
      "customer": "1",
      "automobile": "VIN",
      "price": "40000"
    }
```
The salesperson and customer are referenced by their "id"s , additionally you must use an automobile VIN from the inventory API.
