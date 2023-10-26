import { useState, useEffect } from "react";

function AddTechnicianForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeID] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    setHasSubmitted(false);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    setHasSubmitted(false);
  };

  const handleIDChange = (e) => {
    const value = e.target.value;
    setEmployeeID(value);
    setHasSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      employee_id: employeeId,
    };

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    const technicianResponse = await fetch(technicianUrl, fetchOptions);
    if (technicianResponse.ok) {
      console.log("Technician Added!");
      setFirstName("");
      setLastName("");
      setEmployeeID("");
      setHasSubmitted(true);
    }
  };

  return (
    <>
      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="create-technician-form">
            <h1 className="card-title">Add Technician</h1>
            <div className="form-floating mb-3">
              <input
                onChange={handleFirstNameChange}
                value={firstName}
                placeholder="First Name"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleLastNameChange}
                value={lastName}
                placeholder="Last Name"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleIDChange}
                value={employeeId}
                placeholder="Employee ID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Technician
            </button>
          </form>
        </div>
      </div>
      <div
        className={
          hasSubmitted ? "alert alert-success p-2 col-6 mx-auto" : "d-none"
        }
      >
        <p className="h3 text-center">Technician Successfully Added!</p>
      </div>
    </>
  );
}

export default AddTechnicianForm;
