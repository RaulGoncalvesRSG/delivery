import "./styles.css";
//ReactComponent é um nome genérico
import {ReactComponent as YoutubeIcon} from "./youtube.svg";
import {ReactComponent as LinkedinIcon} from "./linkedin.svg";
import {ReactComponent as InstagramIcon} from "./instagram.svg";

function Footer(){
    return (
        <footer className="main-footer">
            App desenvolvido durante a 2° ed. do evento Semana DevSuperior
            <div className="footer-icons">
                {/*target "_new" leva para uma nova aba do navegador */}
                <a href="https://www.youtube.com/c/DevSuperior" target="_new">
                    <YoutubeIcon/>
                </a>
                <a href="" target="_new">
                    <LinkedinIcon/>
                </a>
                <a href="https://www.instagram.com/devsuperior.ig/" target="_new">
                    <InstagramIcon/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;