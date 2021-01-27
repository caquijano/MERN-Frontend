import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Sale } from "./Sale";
import * as SaleService from "./saleService";
import { useHistory, useParams } from "react-router-dom";
import * as saleService from "../Sales/saleService";
import { BsTrash } from 'react-icons/bs';

function SaleDList() {
  interface Params {
    invoice?: string;
  }

  const history = useHistory();
  const params = useParams<Params>();
  const [sales, setSales] = useState<Sale[]>([]);
  const loadItems = async () => {
    const res = await saleService.getSales();
    setSales(res.data);
  };
  useEffect(() => {
    loadItems();
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
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">
            Detalle de venta: factura N° {params.invoice}
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio x Un</th>
                  <th scope="col">Total</th>
                  <th scope="col">Opciones... </th>
                </tr>
              </thead>
              {sales.map((item, index) => {
                if (item.detailId === params.invoice) {
                  return (
                    <tbody key={index}>
                      <tr>
                          <td>{index+1}</td>
                          <td> {item.productName} </td>
                          <td>{item.amount}</td>
                          <td>$ {item.priceSale}</td>
                          <td>$ {item.priceSale * item.amount}</td>
                          <td><button  className="btn btn-danger btn-sm" > <BsTrash/></button>  </td>
                      </tr>
                    </tbody>
                  );
                }
              })}
                
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleDList;
