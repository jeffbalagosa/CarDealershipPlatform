import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppointmentList from "./AppointmentList";
import AutomobileForm from "./AutomobileForm";
import AutomobilesList from "./AutomobileList";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import MainPage from "./MainPage";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import ModelForm from "./ModelForm";
import ModelsList from "./ModelsList";
import Nav from "./Nav";
import SaleForm from "./SaleForm";
import SalesList from "./SalesList";
import SalespersonForm from "./SalespersonForm";
import SalespersonHistory from "./SalespersonHistory";
import SalespersonList from "./SalespersonList";
import ServiceHistoryList from "./ServiceHistoryList";
import TechnicianList from "./TechnicianList";
import AddTechnicianForm from "./TechnicanForm";

function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [models, setModels] = useState([]);
  const [autos, setAutos] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [sales, setSales] = useState([]);

  async function loadTechnicians() {
    const url = "http://localhost:8080/api/technicians/";
    const response = await fetch(url);
    if (response.ok) {
      const { technicians } = await response.json();
      setTechnicians(technicians);
    } else {
      console.log("An error occurred fetching the data");
    }
  }

  async function loadAppointments() {
    const url = "http://localhost:8080/api/appointments/";
    const response = await fetch(url);
    if (response.ok) {
      const { appointments } = await response.json();
      setAppointments(appointments);
    } else {
      console.log("An error occurred fetching the data");
    }
  }

  async function loadManufacturers() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
    } else {
      console.log("An error occurred fetching the data");
    }
  }

  async function loadModels() {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const { models } = await response.json();
      setModels(models);
    } else {
      console.log("An error occurred fetching the data");
    }
  }

  async function loadAutos() {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const { autos } = await response.json();
      setAutos(autos);
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

  async function loadSales() {
    const response = await fetch("http://localhost:8090/api/sales/");
    const { sales } = await response.json();
    setSales(sales);
  }

  useEffect(() => {
    loadCustomers();
    loadSalespersons();
    loadManufacturers();
    loadModels();
    loadAutos();
    loadTechnicians();
    loadAppointments();
    loadSales();
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
            <Route path="list" element={<ModelsList models={models} />} />
          </Route>
          <Route path="automobiles">
            <Route path="create" element={<AutomobileForm />} />
            <Route path="list" element={<AutomobilesList autos={autos} />} />
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
          <Route path="technicians">
            <Route
              path="list"
              element={<TechnicianList technicians={technicians} />}
            />
            <Route path="create" element={<AddTechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route
              path="list"
              element={<AppointmentList appointments={appointments} />}
            />
            <Route
              path="history/list"
              element={<ServiceHistoryList appointments={appointments} />}
            />
          </Route>
          <Route path="sales">
            <Route
              path="create"
              element={
                <SaleForm
                  customers={customers}
                  salespersons={salespersons}
                  autos={autos}
                />
              }
            />
            <Route path="list" element={<SalesList sales={sales} />} />
            <Route
              path="history"
              element={
                <SalespersonHistory sales={sales} salespersons={salespersons} />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
