import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerForm from "./ManufacturerForm";
import ModelForm from "./ModelForm";
import AutomobileForm from "./AutomobileForm";
import ManufacturerList from "./ManufacturerList";
import { useState, useEffect } from "react";

function App() {
  const [manufacturers, setManufacturers] = useState([]);

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

  useEffect(() => {
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
