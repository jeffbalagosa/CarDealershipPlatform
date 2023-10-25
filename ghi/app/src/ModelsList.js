function ModelsList(props) {
  return (
    <>
      <h1 className="mb-3 text-center">Vehicle Models</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">Picture</th>
          </tr>
        </thead>
        <tbody>
          {props.models.map((model) => {
            return (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td>
                  <img
                    style={{ height: "200px" }}
                    src={model.picture_url}
                    alt={model.name}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ModelsList;
