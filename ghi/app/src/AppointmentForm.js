import { useState } from "react";

function AddAppointmentForm(props) {
  const [vin, setVIN] = useState("");
  const [customer, setCustomer] = useState("");
  const [time, setTime] = useState("");
  const [technician, setTechnician] = useState("");

  const handleVINChange = (e) => {
    const value = e.target.value;
    setVIN(value);
  };

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setCustomer(value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
  };

  const handleTechnicianChange = (e) => {
    const value = e.target.value;
    setTechnician(value);
  };

  return (
    <div className="card shadow m-5 p-3 col-6 mx-auto">
      <div className="card-body">
        <form id="create-appointment-form">
          <h1 className="card-title">Add Service Appointment</h1>
          <div className="form-floating mb-3">
            <input
              onChange={handleVINChange}
              value={vin}
              placeholder="Automobile VIN"
              required
              type="text"
              name="vin"
              id="vin"
              className="form-control"
            />
            <label htmlFor="vin">Automobile VIN</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleCustomerChange}
              value={customer}
              placeholder="Customer"
              required
              type="text"
              name="customer"
              id="customer"
              className="form-control"
            />
            <label htmlFor="customer">Customer</label>
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder="MM/DD/YYYY"
              required
              type="date"
              id="date"
              name="date"
              className="form-control"
            />
            <label htmlFor="date">Date</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleTimeChange}
              value={time}
              required
              type="time"
              id="time"
              name="time"
              className="form-control"
            />
            <label htmlFor="time">Time</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={handleTechnicianChange}
              value={technician}
              className="form-select mb-3"
            >
              <option value="">Choose a Technician</option>
              {props.technicians.map((technician) => (
                <option value={technician.id}>
                  {technician.first_name} {technician.last_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAppointmentForm;
