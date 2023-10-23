import React, {useEffect, useState} from 'react';

function ModelForm() {

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {};
  data.name = name;
  data.manufacturer_id = manufacturer_id;
  data.picture_url = picture_url;


  const ModelUrl = 'http://localhost:8100/api/models/';
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(ModelUrl, fetchConfig);
  if (response.ok) {
    const newModel = await response.json();
    console.log(newModel);
    setName('');
    setManufacturers('');
    setPictureUrl('');
      }
    }
  const [picture_url, setPictureUrl] = useState('')
  const handlePictureUrlChange = (event) => {
  const value = event.target.value;
  setPictureUrl(value);
  }
  const [name, setName] = useState('')
  const handleNameChange = (event) => {
      const value = event.target.value;
      setName(value);
    }

  const [manufacturer_id, setManufacturer] = useState('')
  const handleManufacturerChange = (event) => {
      const value = event.target.value;
      setManufacturer(value);
      }

const [manufacturers, setManufacturers] = useState([]);

const fetchData = async () => {
  const url = 'http://localhost:8100/api/manufacturers/';

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    setManufacturers(data.manufacturers)

  }
}

useEffect(() => {
  fetchData();
}, []);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a vehicle model</h1>
          <form onSubmit={handleSubmit} id="create-Model-form">
            <div className="form-floating mb-3">
            <input onChange={handleNameChange} value={name}
placeholder="fabric" required
       type="text" name="name" id="name"
       className="form-control" />
              <label htmlFor="Name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handlePictureUrlChange} value={picture_url} placeholder="picture_url" required type="url" name="picture_url" id="picture_url" className="form-control"/>
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
            <select  onChange={handleManufacturerChange} value={manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
              <option  value="">Choose a manufacturer</option>
              {manufacturers.map(manufacturer => {
                return (
                    <option key={manufacturer.name} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                );
              })}
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
