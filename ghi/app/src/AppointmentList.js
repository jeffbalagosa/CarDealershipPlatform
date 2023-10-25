function AppointmentList(props) {
  // format date and time using the Date object for more readable display
  const formatDateAndTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  // filter for new appointments so only those are displayed
  const newAppointments = props.appointments.filter(
    (appointment) => appointment.status === "created"
  );

  const handleFinish = async (event, appointmentId) => {
    event.preventDefault();
    const finishUrl = `http://localhost:8080/api/appointments/${appointmentId}/finish/`;
    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    const hatsResponse = await fetch(finishUrl, fetchOptions);
    if (hatsResponse.ok) {
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

    const hatsResponse = await fetch(cancelUrl, fetchOptions);
    if (hatsResponse.ok) {
      console.log(`Appointment ${appointmentId} cancelled!`);
      window.location.assign("/appointments/list");
    }
  };

  return (
    <>
      <h1 className="mb-3 text-center">Service Appointments</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">VIN</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Technician</th>
            <th scope="col">Reason</th>
          </tr>
        </thead>
        <tbody>
          {newAppointments.map((appointment) => {
            const { formattedDate, formattedTime } = formatDateAndTime(
              appointment.date_time
            );
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
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

// TODO: Add VIP Status Column
