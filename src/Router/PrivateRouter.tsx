import { Switch, Route, Redirect } from "react-router-dom";
import { ItemForm } from "../components/Items/ItemForm";
import ItemList from "../components/Items/ItemList";
import EntryForm from "../components/Entry/EntryForm";
import EntryDList from "../components/Entry/EntryDList";
import SaleForm from "../components/Sales/SaleForm";
import SaleDList from "../components/Sales/SaleDList";
import Sales from "../components/Sales/SaleList";
import EntryList from "../components/Entry/EntryList";
import DepositForm from "../components/Deposit/DepositForm";
import DepositList from "../components/Deposit/DepositList";
import Dashboard from "../components/Report/Dashboard";
import Expenses from "../components/Expenses/ExpenseForm";
import ExpensesList from "../components/Expenses/ExpenseList";
import UserList from "../components/Auth/UserList";
import SideBar from "../components/Navigation/SideBar";
import Navbar from "../components/Navigation/Navbar";
import verifyToken from "../utils/verifyToken";
import UserView from "../components/Home/UserView";
import Footer from "../components/Navigation/Footer";
import ContextSidebar from "../context/ContextSidebar";
import React, { useContext } from "react";
import "./router.css";

function PrivateRouter() {
  const { position } = useContext<any>(ContextSidebar);

  verifyToken();

  return (
    <>
      <Navbar />
      <SideBar />
      <div
        className={position ? "PrivateRouter" : "PrivateRouter active"}
        style={{ float: "right" }}
      >
        <Switch>
          <Route exact path="/new-item" component={ItemForm} />
          <Route exact path="/items" component={ItemList} />
          <Route exact path="/new-entry" component={EntryForm} />
          <Route exact path="/entries" component={EntryList} />
          <Route exact path="/new-sale" component={SaleForm} />
          <Route exact path="/sales" component={Sales} />
          <Route exact path="/saledetail/:invoice" component={SaleDList} />
          <Route exact path="/entrydetail/:invoice" component={EntryDList} />
          <Route exact path="/new-deposit" component={DepositForm} />
          <Route exact path="/deposit" component={DepositList} />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/new-expense" component={Expenses} />
          <Route exact path="/expenses" component={ExpensesList} />
          <Route exact path="/userlist" component={UserList} />
          <Route exact path="/userview/:id" component={UserView} />
          <Redirect from="/**" to="/" />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default PrivateRouter;
