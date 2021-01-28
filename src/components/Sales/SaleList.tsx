import React, { ChangeEvent, useEffect, useState } from "react";
import { SaleDetail } from "./SaleDetail";
import * as SaleDetailService from "./saleDetailService";
//import { Item } from "./Item";
//import * as itemService from "./itemService";
import { BsEyeFill } from 'react-icons/bs';
import { FiPlus } from 'react-icons/fi';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const SaleList = () => {
    const history = useHistory();
  const [saleDetail, setSaleDetail] = useState<SaleDetail[]>([]);
const [load, setLoad] = useState(true)
const [search, setSearch] = useState("")
  const loadItems = async () => {
    const res = await SaleDetailService.getSaleDetails();
    setSaleDetail(res.data);
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
        <label className="col-form-label" htmlFor="inputDefault">Buscar Venta:  </label>
        </div>
         <div className="form-group col-lg-4">
        
        <input type="text" className="form-control" placeholder="Ingresar nombre de cliente" id="inputDefault" onChange={handlerInputChange}/>
      </div>
      <div className="form-group col-lg-2"></div>
      <br/>
      <div className="form-group col-lg-3">
        <button type="button" onClick={()=>history.push("/new-sale")} className="btn btn-primary" >Nueva Venta <FiPlus/> </button>
      </div>
      <br/>
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <div className="card-header">Ventas</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">N° Fact</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Total venta</th>
                  <th scope="col">... Opciones... </th>
                </tr>
              </thead>
              {saleDetail.map((item, index) => {
                if (!item.client.indexOf(search)) {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{item.invoice}</td>
                        <td>{item.client}</td>
                        <td>{item.date}</td>
                        <td>${item.totalSale}</td>
                        <td>
                        <button onClick={()=>history.push(`/saledetail/${item.invoice}`)} style={{marginRight: 5}} className="btn btn-primary btn-sm"> <BsEyeFill style={{color: "white"}} /></button>
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

export default SaleList
