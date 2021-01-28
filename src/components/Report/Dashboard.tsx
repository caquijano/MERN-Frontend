import React, { useEffect, useState } from "react";
import logo from "./3556940.jpg";
import { SaleDetail } from "../Sales/SaleDetail";
import * as SaleDetailService from "../Sales/saleDetailService";
import { Deposit } from "../Deposit/Deposit";
import * as DepositService from "../Deposit/depositService";
import { useHistory } from "react-router-dom";
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {FcMoneyTransfer} from 'react-icons/fc'

const Dashboard = () => {
  const [saleDetail, setSaleDetail] = useState<SaleDetail[]>([]);
  const [deposit, setDeposit] = useState<Deposit[]>([]);
  const [load, setLoad] = useState(true);
  const [totalSale, setTotalSale] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const loadSales = async () => {
    const res = await SaleDetailService.getSaleDetails();
    setSaleDetail(res.data);
    const res2 = await DepositService.getDeposits();
    setDeposit(res2.data);
  };

  const sales = async () => {
      let total = 0;
      saleDetail.forEach(element => {
          total = element.totalSale + total
      });
      setTotalSale(total)
  }
  const deposits = async () => {
    let total = 0;
    deposit.forEach(element => {
        total = element.amount + total
    });
    setTotalDeposit(total)
}

  useEffect(() => {
      loadSales();
  }, [])

  useEffect(() => {
    sales();
    deposits();
  }, [saleDetail, deposit])
  

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
        <div className="card border-primary mb-3" style={{ width: 1000 }}>
          <br />
          <div
            className=" form-group row col-lg-12"
            style={{ alignItems: "center", textAlign: "center" }}
          >
            <div className=" form-group col-lg-2">
              <img src={logo} style={{ width: "100%" }} />
            </div>
            <div className=" form-group col-lg-10">
              <h1>Administración Ferreteria Habitat</h1>
            </div>
          </div>
          <hr style={{ height: 3, backgroundColor: "#18bc9c" }} />

          <div className="card-body row">
            <div
              className="col-lg-4 card text-black border-success mb-3 "
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header"> Ventas</div>
              <div className="card-body">
                <h4 className="card-title"><AiOutlineShoppingCart size={40} />{" "} $ {totalSale}</h4>
              </div>
            </div>

            <div
              className="col-lg-4 card text-black border-info mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Consignaciones</div>
              <div className="card-body">
                <h4 className="card-title"><FcMoneyTransfer/> ${totalDeposit}</h4>
              </div>
            </div>
            <div
              className="col-lg-4 card text-white bg-warning mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Gastos</div>
              <div className="card-body">
                <h4 className="card-title">Success card title</h4>
              </div>
            </div>

            <div
              className="col-lg-4 card text-white mb-3"
              style={{
                maxWidth: "27%",
                marginInline: 25,
                backgroundColor: "#54FA27",
              }}
            >
              <div className="card-header">Utilidad</div>
              <div className="card-body">
                <h4 className="card-title">Success card title</h4>
              </div>
            </div>

            <div
              className="col-lg-4 card text-white bg-danger mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Deuda</div>
              <div className="card-body">
                <h4 className="card-title">Success card title</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
