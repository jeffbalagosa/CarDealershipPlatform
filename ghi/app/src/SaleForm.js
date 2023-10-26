import React, { useEffect, useState } from 'react';

function SaleForm(props) {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.customer = customer;
    data.salesperson = salesperson;
    data.automobile = automobile;
    data.price = price;

    const saleUrl = 'http://localhost:8090/api/sales/';
    const fetchData = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(saleUrl, fetchData);
    if (response.ok) {
      const newSale = await response.json();
      console.log(newSale);
      setCustomer('');
      setSalesperson('');
      setAutomobile('');
      setPrice('');
      props.loadSales()
    }
  }
;
  const [customer, setCustomer] = useState('')
  const handleCustomerChange = (event) => {
      const value = event.target.value;
      setCustomer(value);
    }
    const [salesperson, setSalesperson] = useState('')
  const handleSalespersonChange = (event) => {
      const value = event.target.value;
      setSalesperson(value);
    }
    const [automobile, setAutomobile] = useState('')
  const handleAutomobileChange = (event) => {
      const value = event.target.value;
      setAutomobile(value);
    }
    const [price, setPrice] = useState('')
  const handlePriceChange = (event) => {
      const value = event.target.value;
      setPrice(value);
    }
    const filteredAutos = props.autos.filter(((auto) => auto.sold === false))


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record a new sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="mb-3">
              <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="autmobile" className="form-select">
                <option value="">Automobile VIN</option>
                {filteredAutos.map(auto => {
                  return (
                    <option key={auto.id} value={auto.vin}>
                      {auto.vin}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Salesperson</option>
                {props.salespersons.map(salesperson => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select onChange={handleCustomerChange} value={customer} required name="customer" id="customer" className="form-select">
                <option value="">Customer</option>
                {props.customers.map(customer => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePriceChange}
                value={price}
                placeholder="price"
                required
                type="text"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>

            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaleForm;
