import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { Deposit } from './Deposit'
import { SaleDetail } from '../Sales/SaleDetail'
import { Sale } from '../Sales/Sale'
import * as depositService from './depositService'
import { toast } from "react-toastify";
import ItemList from '../Items/ItemList';
import * as saleDetailService from '../Sales/saleDetailService'
import * as saleService from '../Sales/saleService'

const DepositForm = () => {
    const usCurrencyFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
    
    const initialState = {
        depositNumber: "",
        kind: "",
        amount: 0,
        date: ""
    };

    const [item, setItem] = useState<Deposit>(initialState);
    const [deposits, setDeposit] = useState<Deposit[]>([])
    const [salesDetail, setSalesDetail] = useState<SaleDetail[]>([])
    const [sales, setSales] = useState<Sale[]>([])
    const [load, setLoad] = useState(true)
    const [total, setTotal] = useState(0)
    const [ventas, setVentas] = useState(0)
    const [totalDeuda, setTotalDeuda] = useState(0)

    const loadDeposit = async () => {
        const res = await depositService.getDeposits();
        setDeposit(res.data)
    }
    const loadVentas = async () => {
        const res = await saleDetailService.getSaleDetails();
        setSalesDetail(res.data)
        const res2 = await saleService.getSales();
        setSales(res2.data)
    }

    const totalDatos = async () => {
        let t = 0;
        deposits.forEach(element => {
            t = element.amount + t
        });
        setTotal(t)
        let v = 0;
        v = 0;
        salesDetail.forEach(element => {
            v = element.totalSale + v
        })
        setVentas(v)
        let p = 0;
        sales.forEach(element => {
            p = (element.amount * parseInt(`${element.priceBuy}`)) + p
        })
        setTotalDeuda(p)

    }

    const a = usCurrencyFormat.format(ventas); // "$100.10"
    const b = usCurrencyFormat.format(total); // "$100.10"
    const c = usCurrencyFormat.format(totalDeuda- total); // "$100.10"

    const handlerInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
    const handlSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await depositService.createDeposit(item)

        toast.success('Articulo agregado satisfactoriamente')
        setLoad(!load)
        //history.push('/items')
    }

    useEffect(() => {
        loadDeposit();
        loadVentas();

    }, [load])

    useEffect(() => {
        totalDatos();
    }, [deposits, salesDetail, sales])


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
                <div className="card border-primary  form-group col-md-8 ml-3 " style={{ height: "500px" }}  >
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
                            {deposits.map((deposit, index) => {
                                return (
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

                    <div>
                        <div className="card border-secondary mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Ventas</div>
                            <div className="card-body">
                                <h4 className="card-title">{a}</h4>
                            </div>
                        </div>
                        <div className="card border-success mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Consignado</div>
                            <div className="card-body">
                                <h4 className="card-title">{b}</h4>
                            </div>
                        </div>
                        <div className="card border-danger mb-3" style={{ maxWidth: '20rem' }}>
                            <div className="card-header">Deuda</div>
                            <div className="card-body">
                                <h4 className="card-title">{c}</h4>
                                </div>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div >
    )
}

export default DepositForm
