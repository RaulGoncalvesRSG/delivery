//import {BrowserRouter, Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes as Rotas, Link } from "react-router-dom";
import Home from "./Home";
import NavBar from "./Navbar";
import Orders from "./Orders";

//Mecanismo de navegação das rotas
function Routes(){
    return (
        <Router>
                <NavBar/>
        {/**  <Switch>*/}   
       {/** <Route path="/orders">
                    <Orders/>
                </Route>*/}         
            <Rotas>
                <Route path="/orders" element={<Orders/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/" element={<Home/>} />
            </Rotas>
        </Router>
    )
}

export default Routes;