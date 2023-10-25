import frontEndDateAndTimeFormat from "./utils/FormatDateTime";
import markAppointmentsAsVIP from "./utils/MarkAppointmentsAsVIP";
import { useEffect, useState } from "react";

function ServiceHistoryList(props) {
  const [newAppointments, setNewAppointments] = useState([]);

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
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by VIN"
          aria-label="Search by VIN"
        />
        <button className="btn btn-success" type="button" id="button-addon2">
          Search
        </button>
      </div>
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
          {newAppointments.map((appointment) => {
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

// TODO: Add Search Functionality
