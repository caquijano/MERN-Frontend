import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import {Deposit} from './Deposit'
import * as depositService from './depositService'
import { toast } from "react-toastify";
import ItemList from '../Items/ItemList';


const DepositForm = () => {

    const initialState = {
        depositNumber:"",
        kind: "",
        amount: 0,
        date: ""
      };

    const [item, setItem] = useState<Deposit>(initialState);
    const [deposits, setDeposit] = useState<Deposit[]>([])
    const [load, setLoad] = useState(true)
   const [total, setTotal] = useState(0)

    const loadDeposit = async () => {
        const res = await depositService.getDeposits();
        setDeposit(res.data)
        let t=0;
        deposits.forEach(element => { 
             t = element.amount + t            
        });
        setTotal(t)

    }
      const handlerInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
      ) => {
        setItem({ ...item, [e.target.name]: e.target.value });
      };
      const handlSubmit = async (e: FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            
            const res = await depositService.createDeposit(item)
            
           toast.success('Articulo agregado satisfactoriamente')
           setLoad(!load)
            //history.push('/items')
      }


      useEffect(() => {
          loadDeposit();
      }, [load])
    
    return (
        <div
            className=" row-5 m-3"
            style={{
                alignItems: "center",
                alignContent: "center",
                width: "100%",
                justifyContent: "center",
            }}
        >

            <div className="card border-primary mb-1" style={{ width: "95%" }}>
                <div className="card-header">Consignaciones </div>
                <div className="card-body">

                    <form onSubmit={handlSubmit} className="form-horizontal">
                        <fieldset>
                            <div className=" row form-group ">
                                <div className="col-lg-2 row form-group">
                                    <label className="control-label col-lg-4">No </label>
                                    <input
                                        type="text"
                                        className="form-control col-lg-8 "
                                        id="depositNumber"
                                        name="depositNumber"
                                        placeholder="comprobante"
                                        onChange={handlerInputChange}
                                    />
                                </div>

                              

                                <div className="col-lg-2 row form-group">
                                    <label htmlFor="select" className="col-lg-4 control-label">
                                        Tipo
                                    </label>

                                    <select
                                        className="form-control col-lg-8"
                                        name="kind"
                                        id="kind"
                                        onChange={handlerInputChange}
                                    >
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Banco">Banco</option>
                                        <option value="Nequi">Nequi</option>
                                    </select>

                                </div>

                                <div className="col-lg-3 row form-group">
                                    <label className="col-lg-4 control-label">Precio</label>
                                    <input
                                        type="number"
                                        step="any"
                                        name="amount"
                                        className="form-control col-lg-8"
                                        id="amount"
                                        placeholder="Precio"
                                        onChange={handlerInputChange}
                                    />
                                </div>
                                <div className="col-lg-3 row form-group">
                                    <label className="col-lg-5 control-label">Fecha</label>
                                    <input
                                        type="date"
                                        step="any"
                                        name="date"
                                        className="form-control col-lg-7"
                                        id="date"
                                        placeholder="Fecha"
                                        onChange={handlerInputChange}
                                    />
                                </div>

                                <div className="col-lg-2 col-lg-offset-2">

                                    <button type="submit" className="btn btn-primary" >
                                        Submit
                                    </button>
                                </div>

                            </div>


                        </fieldset>
                    </form>
                </div>
            </div>

            <div className=" row">
                <div className="card border-primary  form-group col-md-8 ml-3 " style={{height: "500px"}}  >
                    <div className="table-responsive" >
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th># Comprobante</th>
                                    <th>Tipo</th>
                                    <th>Precio</th>
                                    <th>E</th>
                                </tr>
                            </thead>
                            {deposits.map((deposit,index)=>{
                                return(
                                    <tbody key={index}>
                                    <tr>
                                        <td>{deposit.depositNumber}</td>
                                       
                                        <td>{deposit.kind}</td>
                                        <td>{deposit.amount}</td>
                                    
                                        <td>{deposit.date}</td>
                                    </tr>
    
                                </tbody>

                                )

                            })}
                           
                        </table>
                    </div>
                </div>

                <div className="card border-primary form-group  col-md-3 ml-2  " >
                    <a href="">{total}</a>
                </div>
            </div>

        </div >
    )
}

export default DepositForm
