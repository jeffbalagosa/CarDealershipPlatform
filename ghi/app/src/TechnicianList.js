function TechnicianList(props) {
  return (
    <>
      <h1 className="mb-3 text-center">Technicians</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Employee ID #</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {props.technicians.map((technician) => {
            return (
              <tr key={technician.employee_id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TechnicianList;
