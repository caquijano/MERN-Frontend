import React, { ChangeEvent, useEffect, useState } from "react";
import { EntryDetail } from "./EntryDetail";
import * as EntryDetailService from "./entryDetailService";
import { BsEyeFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { useHistory } from "react-router-dom";
const EntryList = () => {
    const history = useHistory();
  const [entryDetail, setEntryDetail] = useState<EntryDetail[]>([]);
const [load, setLoad] = useState(true)
const [search, setSearch] = useState("")
  const loadItems = async () => {
    const res = await EntryDetailService.getEntryDetails();
    setEntryDetail(res.data);
  };
 
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
        <label className="col-form-label" htmlFor="inputDefault">Buscar Remisión:  </label>
        </div>
         <div className="form-group col-lg-4">
        
        <input type="text" className="form-control" placeholder="Ingresar nombre de proveedor" id="inputDefault" onChange={handlerInputChange}/>
      </div>
      <div className="form-group col-lg-2"></div>
      <br/>
      <div className="form-group col-lg-3">
        <button type="button" onClick={()=>history.push("/new-entry")} className="btn btn-primary" >Nueva Entrada <FiPlus/> </button>
      </div>
      <br/>
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Entradas</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">N° Fact</th>
                  <th scope="col">Proveedor</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Total </th>
                  <th scope="col">... Opciones... </th>
                </tr>
              </thead>
              {entryDetail.map((item, index) => {
                if (!item.provider.indexOf(search)) {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{item.invoice}</td>
                        <td>{item.provider}</td>
                        <td>{item.date}</td>
                        <td>${item.totalEntry}</td>
                        <td>
                        <button onClick={()=>history.push(`/entrydetail/${item.detailId}`)} style={{marginRight: 5}} className="btn btn-primary btn-sm"> <BsEyeFill style={{color: "white"}} /></button>
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
}

export default EntryList

