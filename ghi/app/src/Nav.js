import { NavLink } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success text-center">
      <div className="container-fluid">
        <NavLink
          className="m-2 text-decoration-none shadow bg-dark rounded"
          to="/"
        >
          <img
            src="/rsz_car_logo.png"
            alt="logo"
            className="rounded-circle m-0 p-0"
            style={{ height: "75px" }}
          />
          <div className="m-0 p-0 navbar-brand text-center">CarCar</div>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="ms-auto navbar-nav mb-2 mb-lg-0">
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Inventory
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/manufacturer/list">
                    Manufacturers
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/manufacturer/create">
                    Create a Manufacturer
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/models/list">
                    Models
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/models/create">
                    Create a Model
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/automobiles/list">
                    Automobiles
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/automobiles/create">
                    Create an Automobile
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sales
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/salespeople/list">
                    Salespeople
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sales/history">
                    Salesperson History
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/salespeople/create">
                    Add a Salesperson
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/sales/list">
                    Sales
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sales/create">
                    Add a Sale
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/customers/list">
                    Customers
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/customers/create">
                    Add a Customer
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Service
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/technicians/list">
                    Technicians
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/technicians/create">
                    Add Technician
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/appointments/list">
                    Service Appointments
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/appointments/create">
                    Add Service Appointment
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/appointments/history">
                    Service History
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
