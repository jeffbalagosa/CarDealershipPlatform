import React, { useEffect, useState } from 'react';

function ModelForm(props) {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer_id: '',
    picture_url: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ModelUrl = 'http://localhost:8100/api/models/';

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(ModelUrl, fetchConfig);

    if (response.ok) {
      const newModel = await response.json();
      console.log(newModel);
      setFormData({
        name: '',
        manufacturer_id: '',
        picture_url: '',
      });
      props.loadModels();
    }
  };

  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-Model-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleInputChange}
                value={formData.name}
                placeholder="fabric"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="Name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleInputChange}
                value={formData.picture_url}
                placeholder="picture_url"
                required
                type="url"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleInputChange}
                value={formData.manufacturer_id}
                required
                name="manufacturer_id"
                id="manufacturer"
                className="form-select"
              >
                <option value="">Choose a manufacturer</option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelForm;
