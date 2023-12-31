import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddAppointmentForm from "./AppointmentForm";
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
import AddTechnicianForm from "./TechnicanForm";
import TechnicianList from "./TechnicianList";

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
    if (response.ok) {
      setCustomers(customers);
    } else {
      console.log("An error occurred fetching the data");
    }
  }
  async function loadSalespersons() {
    const response = await fetch("http://localhost:8090/api/salespeople/");
    const { salespersons } = await response.json();
    if (response.ok) {
      setSalespersons(salespersons);
    } else {
      console.log("An error occurred fetching the data");
    }
  }
  async function loadSales() {
    const response = await fetch("http://localhost:8090/api/sales/");
    const { sales } = await response.json();
    if (response.ok) {
      setSales(sales);
    } else {
      console.log("An error occurred fetching the data");
    }
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
            <Route
              path="create"
              element={
                <ManufacturerForm loadManufacturers={loadManufacturers} />
              }
            />
            <Route
              path="list"
              element={<ManufacturerList manufacturers={manufacturers} />}
            />
          </Route>
          <Route path="models">
            <Route
              path="create"
              element={<ModelForm loadModels={loadModels} />}
            />
            <Route path="list" element={<ModelsList models={models} />} />
          </Route>
          <Route path="automobiles">
            <Route
              path="create"
              element={<AutomobileForm loadAutos={loadAutos} />}
            />
            <Route path="list" element={<AutomobilesList autos={autos} />} />
          </Route>
          <Route path="salespeople">
            <Route
              path="create"
              element={<SalespersonForm loadSalespersons={loadSalespersons} />}
            />
            <Route
              path="list"
              element={<SalespersonList salespersons={salespersons} />}
            />
          </Route>
          <Route path="customers">
            <Route
              path="create"
              element={<CustomerForm loadCustomers={loadCustomers} />}
            />
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
            <Route
              path="create"
              element={<AddTechnicianForm loadTechnicians={loadTechnicians} />}
            />
          </Route>
          <Route path="appointments">
            <Route
              path="list"
              element={
                <AppointmentList
                  appointments={appointments}
                  loadAppointments={loadAppointments}
                />
              }
            />
            <Route
              path="create"
              element={
                <AddAppointmentForm
                  technicians={technicians}
                  loadAppointments={loadAppointments}
                />
              }
            />

            <Route
              path="history"
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
                  loadSales={loadSales}
                  loadAutos={loadAutos}
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
