import headerLogo from '../images/header-logo.svg';

function Header(){
    return(
        <header className="header">
            <a className="link" href="./index.html">
                <img className="header__logo" src={headerLogo} alt="Лого Место"/>
            </a>
        </header>
    );
}

export default Header;