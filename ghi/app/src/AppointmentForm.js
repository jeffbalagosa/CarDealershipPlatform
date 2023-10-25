function AddAppointmentForm(props) {
  return (
    <div className="card shadow m-5 p-3 col-6 mx-auto">
      <div className="card-body">
        <form id="create-appointment-form">
          <h1 className="card-title">Add Service Appointment</h1>
          <div className="form-floating mb-3">
            <input
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
              required
              type="time"
              id="time"
              name="time"
              className="form-control"
            />
            <label htmlFor="time">Time</label>
          </div>
          <div className="form-floating mb-3">
            <select className="form-select mb-3">
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
