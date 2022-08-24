import { Switch, Route } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ currentUser, loggedIn }) {
    return (
        <header className="header">
            <a className="link" href="./index.html">
                <img className="header__logo" src={headerLogo} alt="Лого Место" />
            </a>
            <div className='header__elements'>
                <Switch>
                    <Route exact path='/login'>
                        <a className="header__link link" href="#">Регистрация</a>
                    </Route>
                    <Route exact path='/register'>
                        <a className="header__link link" href="#">Вход</a>
                    </Route>
                    <Route path='/'>
                        <p className='header__profile'>{currentUser?.name}</p>
                        <a className="header__link link" href="#">Выход</a>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;