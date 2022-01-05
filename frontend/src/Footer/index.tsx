import "./styles.css";
//ReactComponent é um nome genérico
import {ReactComponent as LinkedinIcon} from "./linkedin.svg";

function Footer(){
    return (
        <footer className="main-footer">
            App desenvolvido durante a 2° ed. do evento Semana DevSuperior
            <div className="footer-icons">
                {/*target "_new" leva para uma nova aba do navegador */}
                <a href="https://www.linkedin.com/in/raul-gon%C3%A7alves-641310190/" target="_new">
                    <LinkedinIcon/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;