import React, { useEffect, useState } from "react";
import logo from "./3556940.jpg";
import { SaleDetail } from "../Sales/SaleDetail";
import * as SaleDetailService from "../Sales/saleDetailService";
import { Sale } from "../Sales/Sale";
import * as SaleService from "../Sales/saleService";
import { Deposit } from "../Deposit/Deposit";
import * as DepositService from "../Deposit/depositService";
import { Expense } from "../Expenses/Expense";
import * as ExpenseService from "../Expenses/expenseService";
import { AiOutlineShoppingCart, AiOutlineWarning} from "react-icons/ai";
import { FcMoneyTransfer } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import { GiPayMoney, GiPiggyBank } from "react-icons/gi";

const Dashboard = () => {
  const [saleDetail, setSaleDetail] = useState<SaleDetail[]>([]);
  const [sale, setSale] = useState<Sale[]>([]);
  const [deposit, setDeposit] = useState<Deposit[]>([]);
  const [expense, setExpense] = useState<Expense[]>([]);
  const [totalSale, setTotalSale] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalUtility, setTotalUtility] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const loadSales = async () => {
    const res = await SaleDetailService.getSaleDetails();
    setSaleDetail(res.data);
    const res2 = await DepositService.getDeposits();
    setDeposit(res2.data);
    const res3 = await ExpenseService.getExpenses();
    setExpense(res3.data);
    const res4 = await SaleService.getSales();
    setSale(res4.data);
  };

  const sales = async () => {
    let total = 0;
    saleDetail.forEach((element) => {
      total = element.totalSale + total;

    });
    setTotalSale(total);
  };
  const deposits = async () => {
    let total = 0;
    deposit.forEach((element) => {
      total = element.amount + total;
    });
    setTotalDeposit(total);
  };
  const expenses = async () => {
    let total = 0;
    expense.forEach((element) => {
      total = element.price + total;
    });
    setTotalExpenses(total);
  }
  const utilities = async () => {
    let total = 0;
    let debts = 0;
    sale.forEach((element) => {
      total = parseInt(`${element.utility}`) + total;
      debts = parseInt(`${element.priceBuy}`)*parseInt(`${element.amount}`)  + debts;
    });
    setTotalUtility(total);
    setTotalDebt(debts-totalDeposit)
  };

  useEffect(() => {
    loadSales();
  }, []);

  useEffect(() => {
    sales();
    deposits();
    utilities();
    expenses();
  }, [saleDetail, deposit, sale, expense]);

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
              <img src={logo} style={{ width: "80%" }} />
            </div>
            <div className=" form-group col-lg-10">
              <h2>Administración Ferreteria Habitat</h2>
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
                <h4 className="card-title">
                  <AiOutlineShoppingCart size={40} /> $ {totalSale}
                </h4>
              </div>
            </div>

            <div
              className="col-lg-4 card text-black border-info mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Consignaciones</div>
              <div className="card-body">
                <h4 className="card-title">
                  <FcMoneyTransfer size={40} /> ${totalDeposit}
                </h4>
              </div>
            </div>
            <div
              className="col-lg-4 card text-black border-warning mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Gastos</div>
              <div className="card-body">
                <h4 className="card-title"><GiPayMoney size={40}/> ${totalExpenses}</h4>
              </div>
            </div>

            <div
              className="col-lg-4 card border-primary text-black mb-3"
              style={{
                maxWidth: "27%",
                marginInline: 25,
              }}
            >
              <div className="card-header">Ganancia x ventas</div>
              <div className="card-body">
                <h4 className="card-title"><GrMoney size={40}/> ${totalUtility}</h4>
              </div>
            </div>

            <div
              className="col-lg-4 card text-white bg-danger mb-3"
              style={{ maxWidth: "27%", marginInline: 25 }}
            >
              <div className="card-header">Deuda</div>
              <div className="card-body">
                <h4 className="card-title"><AiOutlineWarning size={40}/> ${totalDebt}</h4>
              </div>
            </div>
            <div
              className="col-lg-4 card text-black mb-3"
              style={{
                maxWidth: "27%",
                marginInline: 25,
                backgroundColor: "#54FA27",
              }}
            >
              <div className="card-header">Utilidad</div>
              <div className="card-body">
                <h4 className="card-title"><GiPiggyBank size={40}/> ${totalUtility-totalExpenses  }</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
