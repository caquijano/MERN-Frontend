import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import {AiOutlineDashboard} from 'react-icons/ai'

const Navbar = () => {
  const [drop, setDrop] = useState(false);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">
              {" "}
              <h5>Ferreteria Habitat</h5>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/items">
              Inventario
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/entries">
              Entradas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/sales">
              Ventas
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/new-deposit">
              Consignaciones
            </a>
          </li>
          <Dropdown >
            <Dropdown.Toggle id="dropdown">
              Entradas
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              <AiOutlineDashboard/>
              {"         "}
              Administración
            </a>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
