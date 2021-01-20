import React, { ChangeEvent, useEffect, useState } from "react";
import { Item } from "../Items/Item";
import * as itemService from "../Items/itemService";
import { Sale } from "./Sale";
import * as saleService from "./saleService";
import { SaleDetail } from "./SaleDetail";
import * as saleDetailService from "./saleDetailService";

import { BsX } from "react-icons/bs";

const SaleForm = () => {
  interface IArt{
    productId: string;
    amount: Number;
    priceSale:Number;
   
  }
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>();
  const [saleD, setSaleD] = useState<SaleDetail[]>([]);
  //const [sDetail, setSDetail] = useState<SaleDetail>();
  const [load, setLoad] = useState(true);
  const [article, setArticle] = useState<IArt[]>([])
 

  const loadItems = async () => {
    const res = await itemService.getItems();
    setItems(res.data);
    console.log(items)
  };
  const loadSalesD = async () => {
    const res = await saleDetailService.getSaleDetails();
    setSaleD(res.data);
  };
  const changeStock = async (e: ChangeEvent<HTMLSelectElement>) => {
    const res = await itemService.getItem(e.target.value);
    setItem(res.data);    
  }
  const handleAdd = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArticle({...article, [e.target.name]: e.target.value  })
    console.log(article)
  }
  useEffect(() => {
    loadItems();
    loadSalesD();
  }, [load]);
  
  
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
        <div className="form-group col-lg-5"></div>
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Sistema de ventas</div>
          <br />
          <h4>Nueva venta</h4>
          <br />
          <div className="form-group col-lg-12 row">
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Cliente{" "}
            </label>
            <input
              type="text"
              className="form-control col-lg-4"
              placeholder="Nombre del cliente"
            />
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Fecha:{" "}
            </label>
            <input
              type="Date"
              className="form-control col-lg-2"
              placeholder="Nombre del cliente"
            />
            <label className="col-form-label col-lg-2" htmlFor="inputDefault">
              Numero de factura:
            </label>
            <input
              type="text"
              className="form-control col-lg-1"
              placeholder="001"
            />
          </div>
          <div className="card-body">
            <div
              className="card border-success col-lg-12"
              style={{ maxWidth: "60rem" }}
            >
              <form >
              <div className="card-body">
                <div className="form-group row col-lg-12">
                  <div className="form-group col-lg-4">
                    <label htmlFor="exampleSelect2">
                    Articulo
                    </label>
                    <select
                    name="productId"
                      className="form-control"
                      id="exampleSelect2"
                      onChange={changeStock}
                    >
                      <option>Elija un articulo</option>
                      {items.map((item)=>{
                        return(
                        <option value={item._id}>{item.name}</option>)
                      })}
                      
                    </select>
                  </div>
                  <div className="form-group col-lg-2">
                    <label className="col-form-label" htmlFor="inputDefault">
                      Cantidad
                    </label>
                    <input
                    name="amount"
                      type="Number"
                      className="form-control"
                      placeholder="0"
                      onChange={handleAdd}
                    />
                  </div>
                  <div className="form-group col-lg-2">
                    <fieldset disabled>
                      <label className="control-label" htmlFor="disabledInput">
                        Stock
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={item? item.stock : "0"}
                        disabled
                      ></input>
                    </fieldset>
                  </div>
                  <div className="form-group col-lg-2">
                    <fieldset disabled>
                      <label className="control-label" htmlFor="disabledInput">
                        Precio sugerido
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={item? (item.price*0.3)+item.price : "0"}
                        disabled
                      />
                    </fieldset>
                  </div>
                  <div className="form-group col-lg-2">
                    <label className="col-form-label" htmlFor="inputDefault">
                      Precio venta
                    </label>
                    <input
                    name="priceSale"
                      type="Number"
                      className="form-control"
                      placeholder="$00.00"
                      onChange={handleAdd}
                    />
                  </div>
                </div>
                <button  type="submit" className="btn btn-primary">
                  Agregar
                </button>
                <br />
                <br />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Opciones</th>
                      <th scope="col">Articulo</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Precio venta</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <button
                          style={{ marginRight: 5 }}
                          className="btn btn-danger btn-sm"
                        >
                          {" "}
                          <BsX />
                        </button>
                      </td>
                      <td>Arena lavada</td>
                      <td>3</td>
                      <td>$28.000</td>
                      <td>$84.000 </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </form>
            </div>

            <button
              type="submit"
              className="btn btn-success"
              style={{ margin: 20 }}
            >
              Guardar
            </button>
            <button type="submit" className="btn btn-danger" style={{}}>
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;
