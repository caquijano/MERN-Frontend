import React, { ChangeEvent, useEffect, useState } from "react";
import { Item } from "../Items/Item";
import * as itemService from "../Items/itemService";
import { Sale } from "./Sale";
import * as saleService from "./saleService";
import { SaleDetail } from "./SaleDetail";
import * as saleDetailService from "./saleDetailService";
import { toast } from "react-toastify";
import { useHistory, } from "react-router-dom";

import { BsX } from "react-icons/bs";

type FormElemEvent = React.FormEvent<HTMLFormElement>;
interface IArt {
  productId: string;
  amount: number;
  priceSale: number;
}
/*interface IPer {
  client: string;
  date: string | Date;
  invoice: number;
}*/

const SaleForm = () => {
  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);
  const [item, setItem] = useState<Item>();
  const [saleD, setSaleD] = useState<SaleDetail[]>([]);
  const [invoice, setInvoice] = useState(0)
  //const [sDetail, setSDetail] = useState<SaleDetail>();
  const [article, setArticle] = useState<Sale[]>([]);
  const [newArticle, setNewArticle] = useState<Sale>({
    productId: "",
    amount: 0,
    priceSale: 0,
  });
  
  const handleSubmit2 = (e: FormElemEvent): void => {
    e.preventDefault();
    addArticle(
      newArticle ? newArticle : { productId: "", amount: 0, priceSale: 0 }
    );
    setNewArticle({
      productId: "",
      amount: 0,
      priceSale: 0,
    });
  };

  const addArticle = (art: Sale): void => {
    const newArticles: Sale[] = [
      ...article,
      {
        productId: art.productId,
        amount: art.amount,
        priceSale: art.priceSale,
      },
    ];
    setArticle(newArticles);
  };
  const removeArticle = (i: number): void => {
    const newArt: Sale[] = [...article];
    newArt.splice(i, 1);
    setArticle(newArt);
  };

  const loadItems = async () => {
    const res = await itemService.getItems();
    setItems(res.data);
    console.log(items);
  };
  const loadSalesD = async () => {
    const res = await saleDetailService.getSaleDetails();
    setSaleD(res.data);
    changeDetail();
  };
  const changeDetail = async () => {
    
    if(saleD.length === 0){
      setInvoice(1)
    }else{
      setInvoice(saleD.length)
    }
  }
  const [person, setPerson] = useState<SaleDetail>({
    client: "",
    date: "",
    invoice: invoice,
  })
  const changeStock = async (e: ChangeEvent<HTMLSelectElement>) => {
    const res = await itemService.getItem(e.target.value);
    setItem(res.data);
  };
  const handleAdd = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    console.log(newArticle);
  };
  const handleAdd2 = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
    console.log(newArticle);
  };

  const onChange2 = async (e: ChangeEvent<HTMLSelectElement>) => {
    handleAdd(e);
    changeStock(e);
  };

  const save = async () => {
    console.log("hellowprl")
    await saleDetailService.createSaleDetail(person);
    await saleService.createSale(article)
    toast.success('Articulo agregado satisfactoriamente')
    history.push('/items')
  }
  useEffect(() => {
    loadItems();
    loadSalesD();
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
        <div className="form-group col-lg-5"></div>
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header"><h4>Nueva venta</h4></div>
          <br />
          
          <div className="form-group col-lg-12 row">
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Cliente{" "}
            </label>
            <input
            name="client"
              type="text"
              className="form-control col-lg-4"
              placeholder="Nombre del cliente"
              onChange={handleAdd2}
            />
            <label className="col-form-label col-lg-1" htmlFor="inputDefault">
              Fecha:{" "}
            </label>
            <input
            name="date"
              type="Date"
              className="form-control col-lg-2"
              placeholder="Nombre del cliente"
              onChange={handleAdd2}
            />
            <label className="col-form-label col-lg-2" htmlFor="inputDefault">
              Numero de factura:
            </label>
            <input className="form-control col-lg-1" onChange={handleAdd2} style={{color: "blueviolet"}} value={invoice} placeholder={ `${invoice}`}/>
          </div>
          <div className="card-body">
            <div
              className="card border-success col-lg-12"
              style={{ maxWidth: "60rem" }}
            >
              <form id="articleForm" onSubmit={handleSubmit2}>
                <div className="card-body">
                  <div className="form-group row col-lg-12">
                    <div className="form-group col-lg-4">
                      <label htmlFor="exampleSelect2">Articulo</label>
                      <select
                        name="productId"
                        className="form-control"
                        id="exampleSelect2"
                        onChange={onChange2}
                        value={newArticle ? newArticle.productId : ""}
                      >
                        <option>Elija un articulo</option>
                        {items.map((item) => {
                          return <option key={item._id} value={item._id}>{item.name}</option>;
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
                        value={newArticle ? newArticle.amount : 0}
                        autoFocus
                      />
                    </div>
                    <div className="form-group col-lg-2">
                      <fieldset disabled>
                        <label
                          className="control-label"
                          htmlFor="disabledInput"
                        >
                          Stock
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={item ? item.stock : ""}
                          disabled
                        ></input>
                      </fieldset>
                    </div>
                    <div className="form-group col-lg-2">
                      <fieldset disabled>
                        <label
                          className="control-label"
                          htmlFor="disabledInput"
                        >
                          Precio sugerido
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={item ? item.price * 0.3 + item.price : "0"}
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
                        value={newArticle ? newArticle.priceSale : 0}
                        autoFocus
                      />
                    </div>
                  </div>
                  <button form="articleForm" type="submit" className="btn btn-primary">
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
                      {article.map((item, i:number) => {
                        let name = "";
                        {
                          items.forEach((element) => {
                            if (item.productId === element._id) {
                              name = element.name;
                            }
                            console.log(name);
                          });
                        }
                        return (
                          <tr key={i}>
                            <td>
                              <button
                                style={{ marginRight: 5 }}
                                className="btn btn-danger btn-sm"
                                onClick={() => removeArticle(i)}
                              >
                                {" "}
                                <BsX />
                              </button>
                            </td>
                            <td>{name}</td>
                            <td>{item.amount}</td>
                            <td>${item.priceSale}</td>
                            <td>
                              $
                              {parseInt(`${item.priceSale}`) *
                                parseInt(`${item.amount}`)}{" "}
                            </td>
                          </tr>
                        );
                      })}
                      <tr>
                            <td>
                            </td>
                            <td></td>
                            <td></td>
                            <td>Total</td>
                            <td>
                              $35000
                            </td>
                          </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>

            <button
              type="button"
              onClick={()=> save}
              className="btn btn-success"
              style={{ margin: 20 }}
            >
              Guardar
            </button>
            <button type="submit"   className="btn btn-danger" style={{}}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;
