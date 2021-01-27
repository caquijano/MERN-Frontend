import React, { useEffect, useState } from "react";
import { Sale } from "./Sale";
import { SaleDetail } from "./SaleDetail";
import { useHistory, useParams } from "react-router-dom";
import * as saleService from "../Sales/saleService";
import * as saleDetailService from "../Sales/saleDetailService";
import logo from './logoFH.png'
import { BsTrash } from "react-icons/bs";

function SaleDList() {
  interface Params {
    invoice?: string;
  }

  const history = useHistory();
  const params = useParams<Params>();
  const [sales, setSales] = useState<Sale[]>([]);
  const [saleD, setSaleD] = useState<SaleDetail>();
  const loadItems = async () => {
    const res = await saleService.getSales();
    setSales(res.data);
  };
  const loadItems2 = async () => {
    const res = await saleDetailService.getSaleDetail(`${params.invoice}`);
    setSaleD(res.data);
  };
  useEffect(() => {
    loadItems();
    loadItems2();
  }, []);
  return (
    <div>
      <div
        className=" row p-5"
        style={{
          alignItems: "center",
          alignContent: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <br />
          <div
            className=" form-group row col-lg-12"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <div className=" form-group col-lg-3">
              <img src={logo} style={{width: "100%"}}/>
            </div>
            <div className=" form-group col-lg-6">
              <h4>Ferreteria Habitat S.A.S.</h4>
              <h6>NIT 999.999.999</h6>
              <h6>Calle 2 N 6-62 La Florida Cel: 3124047140 - 3123382501</h6>
              <h6>Fusagasuga - Colombia</h6>
            </div>
            <div className=" form-group col-lg-3">
              <h4>Detalle de venta:</h4>
              <h5>factura N° {params.invoice}</h5>
            </div>
          </div>
          <hr style={{ height: 3, backgroundColor: "#18bc9c" }} />

          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr className="table-success">
                  <th scope="row">Cliente: </th>
                  <td>{saleD?.client}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th scope="row">Fecha: </th>
                  <td>{saleD?.date}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </thead>
            </table>

            <table className="table">
              <thead className="table table-active">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Vr. Unitario</th>
                  <th scope="col">Vr. Total</th>
                </tr>
              </thead>
              {sales.map((item, index) => {
                if (item.detailId === params.invoice) {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td> {item.productName} </td>
                        <td>{item.amount}</td>
                        <td>$ {item.priceSale}</td>
                        <td>$ {item.priceSale * item.amount}</td>
                      </tr>
                    </tbody>
                  );
                }
              })}
              <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td  className="table-active">Total</td>
                        <td  className="table-active">${saleD?.totalSale}</td>
                      </tr>
                    </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleDList;
