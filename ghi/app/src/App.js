import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalespersonForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalespersonList from './SalespersonList';
import SaleForm from './SaleForm';
import { useState, useEffect } from 'react';




function App() {
  const [customers, setCustomers] = useState([])
  const [salespersons, setSalespersons] = useState([])
  const [autos, setAutos] = useState([]);

  async function loadAutos() {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    const { autos } = await response.json();
    setAutos(autos)
  }

  async function loadCustomers() {
    const response = await fetch('http://localhost:8090/api/customers/');
    const { customers } = await response.json();
    setCustomers(customers)
  }

  async function loadSalespersons() {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    const { salespersons } = await response.json();
    setSalespersons(salespersons)
  }

  useEffect(() => {
    loadCustomers()
    loadSalespersons();
    loadAutos();
  }, [])



  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer/create/" element={<ManufacturerForm />} />
          <Route path="models/create/" element={<ModelForm />} />
          <Route path="automobiles/create/" element={<AutomobileForm />} />
          <Route path='salespeople'>
            <Route path="create" element={<SalespersonForm />} />
            <Route path="list" element={<SalespersonList salespersons={salespersons} />} />
          </Route>
          <Route path='customers'>
            <Route path="create" element={<CustomerForm />} />
            <Route path="list" element={<CustomerList customers={customers} />} />
          </Route>
          <Route path='sales'>
            <Route path="create" element={<SaleForm customers={customers} salespersons={salespersons} autos = {autos}/>} />
            {/* <Route path="list" element={<CustomerList customers={customers} />} /> */}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
