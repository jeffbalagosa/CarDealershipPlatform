function ManufacturerList(props) {
  return (
    <>
      <h1 className="mb-3 text-center">Vehicle Manufacturers</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {props.manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ManufacturerList;
