import React, {useEffect, useState} from 'react';

function SalespersonForm() {

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {};
  data.first_name = first_name;
  data.last_name = last_name;
  data.employee_id=employee_id;

  const salespersonUrl = 'http://localhost:8090/api/salespeople/';
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(salespersonUrl, fetchConfig);
  if (response.ok) {
    const newSalesperson = await response.json();
    console.log(newSalesperson);
    setFirstName('');
    setLastName('');
    setEmployeeID('');
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

    const [employee_id, setEmployeeID] = useState('')
    const handleEmployeeIDChange = (event) => {
    const value = event.target.value;
    setEmployeeID(value);
    }

return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
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
                onChange={handleEmployeeIDChange}
                value={employee_id}
                placeholder="employee_id"
                required
                type="text"
                name="employee_"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="name">Employee ID</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SalespersonForm;
