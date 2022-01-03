import "./styles.css";
//ReactComponent é um nome genérico
import {ReactComponent as Logo} from "./logo.svg";
import { Link } from "react-router-dom";

function NavBar(){
    return (
        <div className="main-navbar">
            <Logo/>
            <Link to="/" className="logo-text">Delivery</Link>
        </div>
    );
}

export default NavBar;