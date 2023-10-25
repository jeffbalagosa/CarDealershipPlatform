function ServiceHistoryList(props) {
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
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.appointments.map((appointment) => {
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
