import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Prueba } from './components/Videos/Prueba';
import { VideoForm } from './components/Videos/VideoForm';

import 'bootswatch/dist/flatly/bootstrap.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import 'react-toastify/dist/ReactToastify.css';

import PublicRouter from './Router/PublicRouter';
import { ContextSidebarProvider } from './context/ContextSidebar';
import PrivateRouter from './Router/PrivateRouter';


ReactDOM.render(
  <>
  <BrowserRouter>
      {!window.localStorage.getItem("loggedGreenUser") ? (
        <PublicRouter/>
      ) : (
        <ContextSidebarProvider>
          <PrivateRouter/>
        </ContextSidebarProvider>
        
      )}
      <ToastContainer />
    </BrowserRouter>
    {/*<BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={VideoList} />
        <Route path="/prueba" component={Prueba} />
        <Route path="/new-video" component={VideoForm} />
        <Route path="/new-item" component={ItemForm} />
        <Route path="/items" component={ItemList} />
        <Route path="/new-entry" component={EntryForm} />
        <Route path="/entries" component={EntryList} />
        <Route path="/new-sale" component={SaleForm} />
        <Route path="/sales" component={Sales} />
        <Route path="/saledetail/:invoice" component={SaleDList} />
        <Route path="/entrydetail/:invoice" component={EntryDList} />
        <Route path= "/new-deposit" component={DepositForm}/>
        <Route path= "/deposit" component={DepositList}/>
        <Route path= "/dashboard" component={Dashboard}/>
        <Route path= "/new-expense" component={Expenses}/>
        <Route path= "/expenses" component={ExpensesList}/>
      </Switch>
      <ToastContainer />
    </BrowserRouter>
    <Footer />*/}
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
