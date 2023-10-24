function AutomobilesList(props) {
  return (
    <>
      <h1 className="mb-3 text-center">Automobiles</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">VIN</th>
            <th scope="col">Color</th>
            <th scope="col">Year</th>
            <th scope="col">Model</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Sold</th>
          </tr>
        </thead>
        <tbody>
          {props.autos.map((auto) => {
            return (
              <tr key={auto.id}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{auto.sold.toString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobilesList;
