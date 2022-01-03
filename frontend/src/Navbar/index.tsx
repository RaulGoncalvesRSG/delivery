import "./styles.css";
//ReactComponent é um nome genérico
import {ReactComponent as Logo} from "./logo.svg";

function NavBar(){
    return (
        <div className="main-navbar">
            <Logo/>
            <a href="home" className="logo-text">Delivery</a>
        </div>
    );
}

export default NavBar;