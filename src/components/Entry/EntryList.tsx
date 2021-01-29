import React, { useEffect, useState } from "react";
import { Entry } from "./Entry";
import { Item } from "../Items/Item";
import * as entryService from "./entryService";
import * as itemService from "../Items/itemService";
import { BsTrash } from 'react-icons/bs';
import { FiEdit} from 'react-icons/fi';
import { toast } from "react-toastify";
const EntryList = () => {

  const initialState2 = {
    name: "",
    description: "",
    kind: "",
    stock: 0,
    price: 0,
  };
    const [entry, setEntry] = useState<Entry[]>([]);
    const [load, setLoad] = useState(true)
    const [loader, setLoader] = useState(true)
    const [ids, setIds] = useState("")
    const [dates, setDates] = useState<Item>(initialState2)
    
      const loadEntries = async () => {
        const res = await entryService.getEntries();
        setEntry(res.data);
      };
     
      const handleDelete = async (id:string, productId: string, amount:number) => {
        const it = await itemService.getItem(productId)
        const itt = it.data
        
        setIds(`${itt._id}`)
           setDates({...dates, name: itt.name, description: itt.description, kind: itt.kind, stock:parseInt(`${itt.stock}`)-parseInt(`${amount}`), price:itt.price }) 
           setLoader(!loader)
          if (window.confirm("¿Realmente desea eliminar esta entrada?")) {
            await entryService.deleteEntry(id)
            toast.error("Entrada Eliminada correctamente")
              setLoad(!load)
          }
          
      }
      useEffect(() => {
        if (ids && dates) {
          const updateItems = async () => {
           
            await itemService.updateItem(ids, dates);
          };
          updateItems();
        }
      }, [loader])
      useEffect(() => {
        loadEntries();
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
        
      <br/>
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Entradas a almacen</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Comprobante</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Precio Compra</th>
                  <th scope="col">Opciones... </th>
                </tr>
              </thead>
              {entry.map((entry, index) => {
                  
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index+1}</th>
                      <td>{entry.invoice}</td>
                      <td>{entry.productName}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.date}</td>
                      <td>${entry.newPrice}</td>
                      <td><button className="btn btn-warning btn-sm"> <FiEdit style={{color: "#fff"}}/></button> <button onClick={()=>entry._id && entry.productId && handleDelete(entry._id, entry.productId, entry.amount)}  className="btn btn-danger btn-sm"> <BsTrash/></button>  </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
    )
}

export default EntryList
