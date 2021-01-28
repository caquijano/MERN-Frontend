import React, { ChangeEvent, useEffect, useState } from "react";
import { SaleDetail } from "./SaleDetail";
import * as saleDetailService from "./saleDetailService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Item } from "../Items/Item";
import * as itemService from "../Items/itemService";
import { Sale } from "./Sale";
import * as saleService from "./saleService";
import { BsX } from "react-icons/bs";
import {Modal, Button} from 'react-bootstrap'
import Loader from 'react-loader-spinner'


type FormElemEvent = React.FormEvent<HTMLFormElement>;

const SaleForm = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [saleD, setSaleD] = useState<SaleDetail[]>([]);
  const [item, setItem] = useState<Item>();
  const [it, setIt] = useState<Item>();
  const [items, setItems] = useState<Item[]>([]);
  const [article, setArticle] = useState<Sale[]>([]);
  const [newArticle, setNewArticle] = useState<Sale>({
    productId: "",
    productName: "",
    detailId: 0,
    amount: 0,
    priceSale: 0,
    priceBuy: 0,
    utility:0,
  });
  const loadSalesD = async () => {
    const res = await saleDetailService.getSaleDetails();
    setSaleD(res.data);
    changeDetail(res);
  };
  const handleSubmit = async (e: FormElemEvent) => {
    e.preventDefault();
    await save();
  };
  const changeDetail = async (res:any) => {
    
    if (res.data.length === 0) {
      setPerson({...person, invoice: 1})
    } else {
      setPerson({...person, invoice: res.data.length+1})

    }
  };
  const [person, setPerson] = useState<SaleDetail>({
    client: "",
    date: "",
    totalSale:0,
    invoice: 0,
  });

  const handleAdd2 = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  
  const save = async () => {
    await saleDetailService.createSaleDetail(person);
    article.forEach(element => {
      saveArt(element)
      updateItems(`${element.productId}`, parseInt(`${element.amount}`))
    });
    setTimeout(()=>history.push("/sales"), 3000)
    toast.success("Articulo agregado satisfactoriamente");
    //history.push("/sales");
  };

  const handleCancel = async () => {
    
    history.goBack();
  }
  const saveArt = async (element: any) => {
    
    await saleService.createSale(element)
   
    
  }
  

  const handleSubmit2 = (e: FormElemEvent): void => {
    e.preventDefault();
    addArticle(
      newArticle ? newArticle : { productId: "", productName: "", amount: 0, priceSale: 0, detailId: 0, priceBuy: 0, utility:0 }
    );
    setNewArticle({
      productId: "",
      productName: "",
      detailId:0,
      amount: 0,
      priceSale: 0,
      priceBuy: 0,
      utility: 0,
    });
  };
  const addArticle = (art: Sale): void => {
  
    const newArticles: Sale[] = [
      ...article,
      {
        productId: art.productId,
        productName: item?.name,
        amount: art.amount,
        priceSale: art.priceSale,
        detailId: parseInt(`${person.invoice}`),
        priceBuy: parseInt(`${item?.price}`),
        utility: (art.priceSale-parseInt(`${item?.price}`))*art.amount,

      },
    ];
    setArticle(newArticles);
  };
  const onChange2 = async (e: ChangeEvent<HTMLSelectElement>) => {
    handleAdd(e);
    changeStock(e);
  };
  const changeStock = async (e: ChangeEvent<HTMLSelectElement>) => {
    const res = await itemService.getItem(e.target.value);
    setItem(res.data);
  };
  const handleAdd = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };
  const removeArticle = (i: number): void => {
    const newArt: Sale[] = [...article];
    newArt.splice(i, 1);
    setArticle(newArt);
  };
  const loadItems = async () => {
    const res = await itemService.getItems();
    setItems(res.data);
  };
  const updateItems = async (id : string, amount: number) => {
    const res = await itemService.getItem(id);
    setItem(res.data)
    setIt({...it, _id: res.data._id, name: res.data.name, description: res.data.description, kind: res.data.kind, price: res.data.price, stock: res.data.stock-amount, createAt: res.data.createAt });
    
  };
  useEffect(() => {
    if (it?._id ) {
      const updateItem = async () => {
        await itemService.updateItem(`${it._id}`, it);
      };
      updateItem();
    }
    
  }, [it])
  useEffect(() => {
    let t = 0;
    article.forEach(element => {
      t = (element.amount)*(element.priceSale) + t
    });
    setPerson({...person, totalSale: t})
  }, [article])
  useEffect(() => {
    loadSalesD();
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
        <div className="form-group col-lg-5"></div>
        <br />
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">
            <h4>Nueva venta</h4>
          </div>
          <br />
          <form id="myform" onSubmit={handleSubmit}>
            <div className="form-group col-lg-12 row">
              <label className="col-form-label col-lg-1" htmlFor="inputDefault">
                Cliente{" "}
              </label>
              <input
                name="client"
                type="text"
                className="form-control col-lg-4"
                placeholder="Nombre del cliente"
                form="myform"
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
                form="myform"
                onChange={handleAdd2}
              />
              <label className="col-form-label col-lg-2" htmlFor="inputDefault">
                Numero de factura:
              </label>
              <input
                className="form-control col-lg-1"
                onChange={handleAdd2}
                style={{ color: "blueviolet" }}
                form="myform"
                value={person.invoice}
                placeholder={`${person.invoice}`}
              />
            </div>
            <input
                name="totalSale"
                type="hidden"
                onChange={handleAdd2}
                style={{ color: "blueviolet" }}
                form="myform"
                value={ parseInt(`${person.totalSale}`)}
              />
          </form>
          <div className="card-body">
            <div
              className="card border-success col-lg-12"
              style={{ maxWidth: "60rem" }}
            >
              <div>
                <form id="articleForm" onSubmit={handleSubmit2}>
                  <div className="card-body">
                    <div className="form-group row col-lg-12">
                      <div className="form-group col-lg-4">
                        <label htmlFor="exampleSelect2">Articulo</label>
                        <select
                          name="productId"
                          className="form-control"
                          form="articleForm"
                          id="exampleSelect2"
                          onChange={onChange2}
                          value={newArticle ? newArticle.productId : ""}
                        >
                          <option>Elija un articulo</option>
                          {items.map((item) => {
                            return (
                              <option key={item._id} value={item._id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group col-lg-2">
                        <label
                          className="col-form-label"
                          htmlFor="inputDefault"
                        >
                          Cantidad
                        </label>
                        <input
                          name="amount"
                          type="Number"
                          className="form-control"
                          placeholder="0"
                          form="articleForm"
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
                        <label
                          className="col-form-label"
                          htmlFor="inputDefault"
                        >
                          Precio venta
                        </label>
                        <input
                          name="priceSale"
                          type="Number"
                          className="form-control"
                          placeholder="$00.00"
                          onChange={handleAdd}
                          form="articleForm"
                          value={newArticle ? newArticle.priceSale : 0}
                          autoFocus
                        />
                      </div>
                    </div>
                    <button
                      form="articleForm"
                      type="submit"
                      className="btn btn-primary"
                    >
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
                        {article.map((item, i: number) => {
                          let name = "";
                          {
                            items.forEach((element) => {
                              if (item.productId === element._id) {
                                name = element.name;
                              }
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
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Total</td>
                          <td>${person.totalSale}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>

            <button
              type="submit"
              form="myform"
              className="btn btn-success"
              style={{ margin: 20 }}
              onClick={handleShow}
            >
              Guardar
            </button>
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <div> 
        <div >  
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Body  style={{backgroundColor: "#000", }}>
          <div style={{
            borderWidth: 3,
            borderColor: "#fff",
            width: "100%"
          }}>
          <Loader
         type="Bars"
         color="#18bc9c"
         height={100}
         width={"100%"}
         timeout={5000} //3 secs
      />
      </div>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor: "#000", justifyContent: 'center', color: "#18bc9c "}}>
             Por favor espere que cargue la venta...
        </Modal.Footer>
      </Modal>
    </div>
    </div>  
    </div>
    
  );
};

export default SaleForm;
