import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import CustomerCreateUpdate from "./CustomerCreateUpdate";
import CustomersList from "./CustomersList";
import NavbarBootstrap from "./NavbarBootstrap";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const BaseLayout = () => (
  <div>
    < NavbarBootstrap />
    <div className="content"> 
      <Routes>
        <Route path="/" exact element={<CustomersList/>} />
        <Route path="/customer/:pk" element={<CustomerCreateUpdate />} />
        <Route path="/customer/" exact element={<CustomerCreateUpdate/>} />
      </Routes>
    </div>
  </div>  
)


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;
