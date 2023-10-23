import React, {useEffect, useState} from 'react';

function AutomobileForm() {

const handleSubmit = async (event) => {
  event.preventDefault();

  const data = {};
  data.color = color;
  data.year = year;
  data.vin = vin;
  data.model_id = model_id;
  console.log(data);

  const AutomobileUrl = 'http://localhost:8100/api/automobiles/';
  const fetchConfig = {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(AutomobileUrl, fetchConfig);
  if (response.ok) {
    const newAutomobile = await response.json();
    console.log(newAutomobile);
    setColor('');
    setYear('');
    setVin('');
    setModel('');
      }
    }

    const [color, setColor] = useState('')
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

  const [year, setYear] = useState('')
  const handleYearChange = (event) => {
      const value = event.target.value;
      setYear(value);
    }

  const [model_id, setModel] = useState('')
  const handleModelChange = (event) => {
      const value = event.target.value;
      setModel(value);
      }



  const [vin, setVin] = useState('')
  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  }

const [models, setModels] = useState([]);

const fetchData = async () => {
  const url = 'http://localhost:8100/api/models/';

  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    setModels(data.models)

  }
}

useEffect(() => {
  fetchData();
}, []);


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-Automobile-form">
            <div className="form-floating mb-3">
            <input onChange={handleColorChange} value={color}
placeholder="color" required
       type="text" name="color" id="color"
       className="form-control" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleYearChange} value={year} placeholder="year" required type="text" name="style" id="year" className="form-control"/>
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleVinChange} value={vin} placeholder="vin" required type="text" name="vin" id="vin" className="form-control"/>
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
            <select  onChange={handleModelChange} value={model_id} required name="model" id="model" className="form-select">
              <option  value="">Choose a model</option>
              {models.map(model => {
                return (
                    <option key={model.name} value={model.id}>
                    {model.name}
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


export default AutomobileForm;
