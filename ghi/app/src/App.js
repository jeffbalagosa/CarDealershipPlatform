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



import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerForm from "./ManufacturerForm";
import ModelForm from "./ModelForm";
import AutomobileForm from "./AutomobileForm";
import ManufacturerList from "./ManufacturerList";
import { useState, useEffect } from "react";
import SalespersonForm from "./SalespersonForm";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import SalespersonList from "./SalespersonList";

function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);

  async function getManufacturers() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
    } else {
      console.log("An error occurred fetching the data");
    }
  }

  async function loadCustomers() {
    const response = await fetch("http://localhost:8090/api/customers/");
    const { customers } = await response.json();
    setCustomers(customers);
  }

  async function loadSalespersons() {
    const response = await fetch("http://localhost:8090/api/salespeople/");
    const { salespersons } = await response.json();
    setSalespersons(salespersons);
  }

  useEffect(() => {
    loadCustomers();
    loadSalespersons();
    loadAutos();
  }, [])


    getManufacturers();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer">
            <Route path="create" element={<ManufacturerForm />} />
            <Route
              path="list"
              element={<ManufacturerList manufacturers={manufacturers} />}
            />
          </Route>
          <Route path="models">
            <Route path="create" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="salespeople">
            <Route path="create" element={<SalespersonForm />} />
            <Route
              path="list"
              element={<SalespersonList salespersons={salespersons} />}
            />
          </Route>
          <Route path="customers">
            <Route path="create" element={<CustomerForm />} />
            <Route
              path="list"
              element={<CustomerList customers={customers} />}
            />
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
