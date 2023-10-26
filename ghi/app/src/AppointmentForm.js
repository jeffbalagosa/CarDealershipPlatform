import { useState } from "react";
import dateTimeSubmitFormat from "./utils/DateTimeSubmitFormat";

function AddAppointmentForm(props) {
  const [vin, setVIN] = useState("");
  const [customer, setCustomer] = useState("");
  const [time, setTime] = useState("");
  const [technician, setTechnician] = useState("");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleVINChange = (e) => {
    const value = e.target.value;
    setVIN(value);
    setHasSubmitted(false);
  };

  const handleCustomerChange = (e) => {
    const value = e.target.value;
    setCustomer(value);
    setHasSubmitted(false);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTime(value);
    setHasSubmitted(false);
  };

  const handleTechnicianChange = (e) => {
    const value = e.target.value;
    setTechnician(value);
    setHasSubmitted(false);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
    setHasSubmitted(false);
  };

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setReason(value);
    setHasSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateTime = dateTimeSubmitFormat(date, time);

    const data = {
      vin: vin,
      customer: customer,
      technician: technician,
      date_time: dateTime,
      reason: reason,
    };

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    const appointmentResponse = await fetch(appointmentUrl, fetchOptions);
    if (appointmentResponse.ok) {
      console.log("Appointment Added!");
      setVIN("");
      setCustomer("");
      setTime("");
      setTechnician("");
      setDate("");
      setReason("");
      props.loadAppointments();
      setHasSubmitted(true);
    }
  };

  return (
    <>
      <div className="card shadow m-5 p-3 col-6 mx-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit} id="create-appointment-form">
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
                onChange={handleDateChange}
                value={date}
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
                  <option
                    key={technician.employee_id}
                    value={technician.employee_id}
                  >
                    {technician.first_name} {technician.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleReasonChange}
                value={reason}
                placeholder="Reason"
                required
                type="text"
                name="reason"
                id="reason"
                className="form-control"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Appointment
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

export default AddAppointmentForm;
