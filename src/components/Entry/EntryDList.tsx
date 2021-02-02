import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { EntryDetail } from "./EntryDetail";
import { useParams } from "react-router-dom";
import * as entryService from "../Entry/entryService";
import * as entryDetailService from "../Entry/entryDetailService";
import logo from './logoFH.png'


function EntryDList() {
  interface Params {
    invoice?: string;
  }

  const params = useParams<Params>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [entryD, setEntryD] = useState<EntryDetail>();
  const loadItems = async () => {
    const res = await entryService.getEntries();
    setEntries(res.data);
  };
  const loadItems2 = async () => {
    const res = await entryDetailService.getEntryDetail( `${params.invoice}`);
    setEntryD(res.data);
  };
  useEffect(() => {
    loadItems();
    loadItems2();
  }, []);
  let n = 0;
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
              <h4>Ferreteria Habitat.</h4>
              <h6>NIT 999.999.999</h6>
              <h6>Calle 2 N 6-62 La Florida Cel: 3124047140 - 3123382501</h6>
              <h6>Fusagasuga - Colombia</h6>
            </div>
            <div className=" form-group col-lg-3">
              <h4>Detalle de Compra:</h4>
              <h5>Remisión N° {entryD?.invoice}</h5>
            </div>
          </div>
          <hr style={{ height: 3, backgroundColor: "#18bc9c" }} />

          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr className="table-success">
                  <th scope="row">Cliente: </th>
                  <td>{entryD?.provider}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <th scope="row">Fecha: </th>
                  <td>{entryD?.date}</td>
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
              {entries.map((item, index) => {
                  
                if (item.detailId === params.invoice) {
                  
                  n= n+1;
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{n}</td>
                        <td> {item.productName} </td>
                        <td>{item.amount}</td>
                        <td>$ {item.newPrice}</td>
                        <td>$ {item.newPrice * item.amount}</td>
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
                        <td  className="table-active">${entryD?.totalEntry}</td>
                      </tr>
                    </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryDList;
