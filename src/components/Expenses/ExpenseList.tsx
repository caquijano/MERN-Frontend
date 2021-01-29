import React, { ChangeEvent, useEffect, useState } from "react";
import { Expense } from "./Expense";
import * as expenseService from "./expenseService";
import { BsTrash } from 'react-icons/bs';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const ItemList = () => {
  const history = useHistory();
  const [expense, setExpenses] = useState<Expense[]>([]);
const [load, setLoad] = useState(true)
const [search, setSearch] = useState("")
  const loadItems = async () => {
    const res = await expenseService.getExpenses();
    setExpenses(res.data);
  };
 
  const handleDelete = async (id:string) => {
      if (window.confirm("¿Realmente desea eliminar este Gasto?")) {
        await expenseService.deleteExpense(id)
        toast.error("Gasto Eliminado correctamente")
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
        <label className="col-form-label" htmlFor="inputDefault">Buscar producto:  </label>
        </div>
         <div className="form-group col-lg-4">
        
        <input type="text" className="form-control" placeholder="Ingresar nombre de producto" id="inputDefault" onChange={handlerInputChange}/>
      </div>
      <div className="form-group col-lg-2"></div>
      <br/>
      <div className="form-group col-lg-3">
        <button type="button" onClick={()=>history.push("/new-expense")} className="btn btn-primary" >Nuevo Gasto <FiPlus/> </button>
      </div>
      <br/>
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Inventario</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Concepto</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Valor</th>
                  <th scope="col">... Opciones... </th>
                </tr>
              </thead>
              {expense.map((item, index) => {
                if (!item.concept.indexOf(search)) {
                  return (
                    <tbody key={index}>
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{item.concept}</td>
                        <td>{item.date}</td>
                        <td>${item.price}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" style={{marginRight: 5}}> <FiEdit style={{color: "#fff"}}/></button> 
                        <button onClick={()=>item._id && handleDelete(item._id)} style={{marginRight: 5}} className="btn btn-danger btn-sm"> <BsTrash/></button>
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
