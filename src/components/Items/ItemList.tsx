import React, { ChangeEvent, useEffect, useState } from "react";
import { Item } from "./Item";
import * as itemService from "./itemService";
import { BsTrash, BsPlusCircle } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ItemList = () => {
  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);
const [load, setLoad] = useState(true)
const [search, setSearch] = useState("")
  const loadItems = async () => {
    const res = await itemService.getItems();
    setItems(res.data);
    console.log(items)
  };
 
  const handleDelete = async (id:string) => {
      if (window.confirm("¿Realmente desea eliminar este articulo?")) {
        await itemService.deleteItem(id)
        toast.error("Articulo Eliminado correctamente")
          setLoad(!load)
      }
      
  }
  const handlerInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setLoad(!load)
  };

  useEffect(() => {
    loadItems();
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
        <div className="form-group col-lg-1">
        
        </div>
        <div className="form-group col-lg-2">
        <label className="col-form-label" htmlFor="inputDefault">Buscar producto: </label>
        </div>
         <div className="form-group col-lg-4">
        
        <input type="text" className="form-control" placeholder="Ingresar nombre de producto" id="inputDefault" onChange={handlerInputChange}/>
      </div>
      <div className="form-group col-lg-5"></div>
      <br/>
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Inventario</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Producto</th>
                  <th scope="col">Descripción</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Cant</th>
                  <th scope="col">Precio Compra</th>
                  <th scope="col">Precio Sugerido</th>
                  <th scope="col">... Opciones... </th>
                </tr>
              </thead>
              {items.map((item, index) => {
                if (!item.name.indexOf(search)) {
                  return (
                    <tbody>
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.kind}</td>
                        <td>{item.stock}</td>
                        <td>${item.price}</td>
                        <td>${item.price + (item.price*0.3)}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" style={{marginRight: 5}}> <FiEdit style={{color: "#fff"}}/></button> 
                        <button onClick={()=>item._id && handleDelete(item._id)} style={{marginRight: 5}} className="btn btn-danger btn-sm"> <BsTrash/></button>
                        <button onClick={()=>history.push(`/new-entry/${item._id}`)} style={{marginRight: 5}} className="btn btn-info btn-sm"> <BsPlusCircle/></button>
                          </td>
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
};

export default ItemList;
