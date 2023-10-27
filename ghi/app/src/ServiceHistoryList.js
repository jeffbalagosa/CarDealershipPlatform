import { useEffect, useState } from "react";
import frontEndDateAndTimeFormat from "./utils/FormatDateTime";
import markAppointmentsAsVIP from "./utils/MarkAppointmentsAsVIP";

function ServiceHistoryList(props) {
  const [newAppointments, setNewAppointments] = useState([]);
  const [searchVin, setVIN] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filtered = newAppointments.filter((appointment) => {
      const lowerCasedAppointmentVin = appointment.vin.toLowerCase();
      const lowerCasedSearchVin = searchVin.toLowerCase();
      return lowerCasedAppointmentVin.includes(lowerCasedSearchVin);
    });
    setFilteredAppointments(filtered);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setVIN(value);
  };

  useEffect(() => {
    const updateVIPStatus = async () => {
      const updatedAppointments = await markAppointmentsAsVIP(
        props.appointments
      );
      setNewAppointments(updatedAppointments);
    };

    updateVIPStatus();
  }, [props.appointments]);

  return (
    <>
      <h1 className="mb-3 text-center">Service Appointments</h1>
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          onChange={handleChange}
          value={searchVin}
          type="text"
          className="form-control"
          placeholder="Search by VIN"
          aria-label="Search by VIN"
        />
        <button className="btn btn-success" type="submit" id="button-addon2">
          Search
        </button>
      </form>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">VIN</th>
            <th scope="col">Is VIP ?</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Technician</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {(filteredAppointments.length > 0
            ? filteredAppointments
            : newAppointments
          ).map((appointment) => {
            const { formattedDate, formattedTime } = frontEndDateAndTimeFormat(
              appointment.date_time
            );
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.isVIP ? "Yes" : "No"}</td>
                <td>{appointment.customer}</td>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
                <td>{appointment.technician}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ServiceHistoryList;
