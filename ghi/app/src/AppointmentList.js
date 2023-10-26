import frontEndDateAndTimeFormat from "./utils/FormatDateTime";
import markAppointmentsAsVIP from "./utils/MarkAppointmentsAsVIP";
import { useEffect, useState } from "react";

function AppointmentList(props) {
  const [newAppointments, setNewAppointments] = useState([]);

  const handleFinish = async (event, appointmentId) => {
    event.preventDefault();
    const finishUrl = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    const finishResponse = await fetch(finishUrl, fetchOptions);
    if (finishResponse.ok) {
      console.log(`Appointment ${appointmentId} finished!`);
      window.location.assign("/appointments/list");
    }
  };

  const handleCancel = async (event, appointmentId) => {
    event.preventDefault();
    const cancelUrl = `http://localhost:8080/api/appointments/${appointmentId}/cancel/`;
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    const cancelResponse = await fetch(cancelUrl, fetchOptions);
    if (cancelResponse.ok) {
      console.log(`Appointment ${appointmentId} cancelled!`);
      window.location.assign("/appointments/list");
    }
  };

  useEffect(() => {
    const updateVIPStatus = async () => {
      const updatedAppointments = await markAppointmentsAsVIP(
        props.appointments
      );
      setNewAppointments(
        // filter for new appointments so only those are displayed
        updatedAppointments.filter((app) => app.status === "created")
      );
    };

    updateVIPStatus();
  }, [props.appointments]);

  return (
    <>
      <h1 className="mb-3 text-center">Service Appointments</h1>
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
                <td>
                  <button
                    onClick={(event) => handleCancel(event, appointment.id)}
                    className="m-1 btn btn-sm btn-danger"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={(event) => handleFinish(event, appointment.id)}
                    className="btn btn-sm btn-success"
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppointmentList;
