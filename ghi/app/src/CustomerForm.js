import React, {useEffect, useState} from 'react';

function CustomerForm() {

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {};
  data.first_name = first_name;
  data.last_name = last_name;
  data.address=address;
  data.phone_number = phone_number

  const customerUrl = 'http://localhost:8090/api/customers/';
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(customerUrl, fetchConfig);
  if (response.ok) {
    const newCustomer = await response.json();
    console.log(newCustomer);
    setFirstName('');
    setLastName('');
    setAddress('');
    setPhoneNumber('');
    window.location.reload()
      }
    }

    const [first_name, setFirstName] = useState('')
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const [last_name, setLastName] = useState('')
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
        }

    const [address, setAddress] = useState('')
    const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
    }

    const [phone_number, setPhoneNumber] = useState('')
    const handlePhoneNumberChange = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    }

return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={first_name}
                placeholder="firstname"
                required
                type="text"
                name="firstname"
                id="firstname"
                className="form-control"
              />
              <label htmlFor="name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={last_name}
                placeholder="lastname"
                required
                type="text"
                name="lastname"
                id="lastname"
                className="form-control"
              />
              <label htmlFor="name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleAddressChange}
                value={address}
                placeholder="address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
              <label htmlFor="name">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePhoneNumberChange}
                value={phone_number}
                placeholder="phone_number"
                required
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-control"
              />
              <label htmlFor="name">Phone Number</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CustomerForm;
