import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import VideoList from './components/Videos/VideoList';
import { Prueba } from './components/Videos/Prueba';
import { VideoForm } from './components/Videos/VideoForm';
import { ItemForm } from "./components/Items/ItemForm";
import  ItemList  from "./components/Items/ItemList";
import EntryForm from "./components/Entry/EntryForm";
import SaleForm from "./components/Sales/SaleForm";
import  EntryList  from "./components/Entry/EntryList";
import 'bootswatch/dist/flatly/bootstrap.css';
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={VideoList} />
      <Route  path="/prueba" component={Prueba} />
      <Route  path="/new-video" component={VideoForm} />
      <Route  path="/new-item" component={ItemForm} />
      <Route path="/items" component={ItemList} />
      <Route  path="/new-entry/:id" component={EntryForm} />
      <Route path="/entries" component={EntryList} />
      <Route  path="/new-sale" component={SaleForm} />
    </Switch>
    <ToastContainer/>
    </BrowserRouter>
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();