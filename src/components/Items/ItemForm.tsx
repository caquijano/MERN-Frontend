import React, { ChangeEvent, FormEvent, useState } from "react";
import { Item } from "./Item";
import * as itemService from "./itemService"
import { toast } from "react-toastify";
import { useHistory, } from "react-router-dom";

export const ItemForm = () => {
  const initialState = {
    name: "",
    description: "",
    kind: "",
    stock: 0,
    price: 0,
  };
  
  const history = useHistory();


  const [item, setItem] = useState<Item>(initialState);

  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handlSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await itemService.createItem(item);
    toast.success('Articulo agregado satisfactoriamente')
    history.push('/items')
  }

  return (
    <div
      className=" row p-5"
      style={{
        alignItems: "center",
        alignContent: "center",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <div className="card border-primary mb-3" style={{ width: 800 }}>
        <div className="card-header">Productos </div>
        <div className="card-body">
          <h4 className="card-title">Nuevo Producto</h4>

          <form onSubmit={handlSubmit} className="form-horizontal">
            <fieldset>
              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Nombre</label>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nombre"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="textArea" className="col-lg-2 control-label">
                  Descripción
                </label>
                <div className="col-lg-7">
                  <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    id="description"
                    defaultValue={""}
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="row form-group">
                <div className="col-lg-1"></div>
                <label htmlFor="select" className="col-lg-2 control-label">
                  Tipo
                </label>
                <div className="col-lg-7">
                  <select
                    className="form-control"
                    name="kind"
                    id="select"
                    onChange={handlerInputChange}
                    
                  >
                    <option selected >Tipo...</option>
                    <option value="Pinturas">Pinturas</option>
                    <option value="Ferreteria">Ferreteria</option>
                    <option value="Otro">Otro..</option>
                  </select>
                </div>
              </div>
              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Precio</label>
                <div className="col-lg-7">
                  <input
                    type="number"
                    step="any"
                    name="price"
                    className="form-control"
                    id="price"
                    placeholder="Precio"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>

              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Cantidad</label>
                <div className="col-lg-7">
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    id="stock"
                    placeholder="Cantidad"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <button type="reset" className="btn btn-default">
                  </button>
                  <button  type="submit" className="btn btn-primary" >
                    Agregar
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
