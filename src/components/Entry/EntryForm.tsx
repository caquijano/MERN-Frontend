import React, { ChangeEvent, useEffect, useState } from "react";
import { EntryDetail } from "./EntryDetail";
import * as entryDetailService from "./entryDetailService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Item } from "../Items/Item";
import * as itemService from "../Items/itemService";
import { Entry } from "./Entry";
import * as entryService from "./entryService";
import { BsX } from "react-icons/bs";
import {Modal} from 'react-bootstrap'
import Loader from 'react-loader-spinner'


type FormElemEvent = React.FormEvent<HTMLFormElement>;

const EntryForm = () => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [item, setItem] = useState<Item>();
  const [it, setIt] = useState<Item>();
  const [items, setItems] = useState<Item[]>([]);
  const [article, setArticle] = useState<Entry[]>([]);
  const [newArticle, setNewArticle] = useState<Entry>({
    productId: "",
    productName: "",
    detailId: 0,
    amount: 0,
    newPrice: 0,
  });
  const loadEntryD = async () => {
    const res = await entryDetailService.getEntryDetails();
    changeDetail(res);
  };
  const changeDetail = async (res:any) => {
    
    if (res.data.length === 0) {
      setPerson({...person, detailId: 1})
    } else {
      setPerson({...person, detailId: res.data.length+1})

    }
  };
  const handleSubmit = async (e: FormElemEvent) => {
    e.preventDefault();
    await save();
  };
 
  const [person, setPerson] = useState<EntryDetail>({
    provider: "",
    date: "",
    totalEntry:0,
    invoice: "",
    detailId: 0
  });

  const handleAdd2 = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };
  
  const save = async () => {
    await entryDetailService.createEntryDetail(person);
    article.forEach(element => {
      saveArt(element)
      updateItems(`${element.productId}`, parseInt(`${element.amount}`),parseInt(`${element.newPrice}` ))
    });
    setTimeout(()=>history.push("/entries"), 3000)
    toast.success("Entrada agregada satisfactoriamente");
    //history.push("/sales");
  };

  const handleCancel = async () => {
    
    history.goBack();
  }
  const saveArt = async (element: any) => {
    await entryService.createEntry(element)  
  }
  
  const handleSubmit2 = (e: FormElemEvent): void => {
    e.preventDefault();
    addArticle(
      newArticle ? newArticle : { productId: "", productName: "", amount: 0, newPrice: 0, detailId: 0 }
    );
    setNewArticle({
      productId: "",
      productName: "",
      detailId:0,
      amount: 0,
      newPrice:0,
    });
  };
  const addArticle = (art: Entry): void => {
  
    const newArticles: Entry[] = [
      ...article,
      {
        productId: art.productId,
        productName: item?.name,
        amount: art.amount,
        newPrice: art.newPrice,
        detailId: parseInt(`${person.detailId}`),
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
    const newArt: Entry[] = [...article];
    newArt.splice(i, 1);
    setArticle(newArt);
  };
  const loadItems = async () => {
    const res = await itemService.getItems();
    setItems(res.data);
  };
  const updateItems = async (id : string, amount: number, newprice: number) => {
    const res = await itemService.getItem(id);
    setItem(res.data)
    setIt({...it, _id: res.data._id, name: res.data.name, description: res.data.description, kind: res.data.kind, price: (((res.data.price*res.data.stock)+(newprice*amount))/(res.data.stock+amount)), stock: res.data.stock+amount, createAt: res.data.createAt });
    
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
      t = (element.amount)*(element.newPrice) + t
    });
    setPerson({...person, totalEntry: t})
  }, [article])
  useEffect(() => {
    loadEntryD();
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
            <h4>Nueva Entrada en almacen</h4>
          </div>
          <br />
          <form id="myform" onSubmit={handleSubmit}>
            <div className="form-group col-lg-12 row">
              <div className="form-group col-lg-6 row" >
                <label className="col-form-label col-lg-3" htmlFor="inputDefault">
                Proveedor:{" "}
              </label>
              <input
                name="provider"
                type="text"
                className="form-control col-lg-8"
                placeholder="Nombre del Proveedor"
                form="myform"
                onChange={handleAdd2}
              />
              </div>
              
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
              <div className="form-group col-lg-3 row">
                 <label className="col-form-label col-lg-7" htmlFor="inputDefault">
                N° Remisión:
              </label>
              
              <input
                name="invoice"
                className="form-control col-lg-5"
                onChange={handleAdd2}
                style={{ color: "blueviolet" }}
                form="myform"
                placeholder="# remisión"
              />
              </div>
              <input
              type="hidden"
                name="detailId"
                className="form-control col-lg-5"
                onChange={handleAdd2}
                style={{ color: "blueviolet" }}
                form="myform"
                placeholder={`${person.invoice}`}
              />
              
             
            </div>
            <input
                name="totalEntry"
                type="hidden"
                onChange={handleAdd2}
                style={{ color: "blueviolet" }}
                form="myform"
                value={ parseInt(`${person.totalEntry}`)}
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
                      <div className="form-group col-lg-1">
                        <label htmlFor="exampleSelect2">Articulo:</label>
                        
                      </div>
                      <div className="form-group col-lg-4">
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
                      <div className="form-group col-lg-1">
                        <label
                          className="col-form-label"
                          htmlFor="inputDefault"
                        >
                          Cantidad:
                        </label>
                      </div>
                      <div className="form-group col-lg-2">
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
                      <div className="form-group col-lg-1">
                        <label
                          className="col-form-label"
                          htmlFor="inputDefault"
                        >
                          Precio:
                        </label>
                      </div>
                      <div className="form-group col-lg-2">
                        <input
                          name="newPrice"
                          type="Number"
                          className="form-control"
                          placeholder="$00.00"
                          onChange={handleAdd}
                          form="articleForm"
                          value={newArticle ? newArticle.newPrice: 0}
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
                          <th scope="col">Precio </th>
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
                              <td>${item.newPrice}</td>
                              <td>
                                $
                                {parseInt(`${item.newPrice}`) *
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
                          <td>${person.totalEntry}</td>
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
             Por favor espere que cargue la entrada...
        </Modal.Footer>
      </Modal>
    </div>
    </div>  
    </div>
    
  );
};

export default EntryForm;