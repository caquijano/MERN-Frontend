import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Item } from "../Items/Item";
import { Entry } from "./Entry";
import * as itemService from "../Items/itemService";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import * as entryService from "./entryService";


const EntryForm = () => {
  const initialState = {
    invoice: "",
    productId: "",
    productName: "",
    amount: 0,
    date: "",
    newPrice: 0,
  };
  const initialState2 = {
    name: "",
    description: "",
    kind: "",
    stock: 0,
    price: 0,
  };
  interface Params {
    id?: string;
  }

  const history = useHistory();
  const params = useParams<Params>();
  const [entry, setEntry] = useState<Entry>(initialState);
  //const [items, setItems] = useState<Item[]>([]);
 
  const [id, setId] = useState("")
  const [load, setLoad] = useState(true)
  const [nombres, setNombres] = useState("")
  const [dates, setDates] = useState(initialState2)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    const suma = sumar(parseInt(`${entry.amount}`) , parseInt(`${dates.stock}`))
    setDates({...dates, stock:suma, price:entry.newPrice})
    e.preventDefault();
    setLoad(!load)
    await entryService.createEntry(entry);
    toast.success('Se han ingresado articulos satisfactoriamente')
    history.push('/entries')
  }

  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };
  
  
  function sumar(valor1:number, valor2:number): number {
    return valor1+valor2;
  }   
  
  const loadItems = async () => {
    if(params.id){
      const res = await itemService.getItem(`${params.id}`);
      setId(params.id)
      setEntry({...entry, productId: res.data._id, productName: res.data.name})
      setDates({...dates, name: res.data.name, description:res.data.description, kind: res.data.kind, stock: res.data.stock, price: res.data.price  })
      setNombres(res.data.name)
    }
  };
  useEffect(() => {
    if (id && dates) {
      const updateItems = async () => {
        await itemService.updateItem(id, dates);
      };
      updateItems();
      console.log("bien")
    }
    
  }, [load])
  useEffect(() => {
    loadItems();
  }, []);

  
 
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
        <div className="card-header">{nombres}</div>
        <div className="card-body">
          <h4 className="card-title">Entrada de productos</h4>

          <form onSubmit={handleSubmit} className="form-horizontal">
            <fieldset>
              
              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">N° Factura</label>
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control"
                    id="invoice"
                    name="invoice"
                    placeholder="N° Factura"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>

              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Fecha entrada</label>
                <div className="col-lg-7">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    placeholder="fecha"
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
                    step="any"
                    name="amount"
                    className="form-control"
                    id="amount"
                    placeholder="Cantidad"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>

              <div className=" row form-group">
                <div className="col-lg-1"></div>
                <label className="col-lg-2 control-label">Precio</label>
                <div className="col-lg-7">
                  <input
                    type="number"
                    name="newPrice"
                    className="form-control"
                    id="price"
                    placeholder="$ Precio de compra"
                    onChange={handlerInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-lg-10 col-lg-offset-2">
                  <button type="reset" className="btn btn-default">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
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

export default EntryForm;
