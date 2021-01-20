import React from 'react'
import "../reports/dashboard.css"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SaleReport from './SaleReport';
import DepositReport from './DepositReport';
const Report = () => {
    return (
        <div className="row">
           
                <nav id="sidebar">
                    <li className="nav-item ">
                        <a className="nav-link" href="#">Productos</a>
                    </li>
                    <li className="btn-especial">
                        <a className="nav-link" href="#">Consignaciones</a>
                    </li>
                    <li className="btn-especial">
                        <a className="nav-link" href="#">ventas</a>
                    </li>
                </nav>
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Reportes </h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                            </div>
                            <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                <span data-feather="calendar" /> This week
                        </button>
                        </div>
                    </div>
                    <DepositReport/>

                   

                </main>
          
        </div>
    )
}

export default Report