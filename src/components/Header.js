import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header({ currentUser }) {
    return (
        <header className="header">
            <a className="link" href="./index.html">
                <img className="header__logo" src={headerLogo} alt="Лого Место" />
            </a>
            <div className='header__elements'>
                <Switch>
                    <Route exact path='/login'>
                        <Link className="header__link link" to="/register">Регистрация</Link>
                    </Route>
                    <Route exact path='/register'>
                        <Link className="header__link link" to="/login">Вход</Link>
                    </Route>
                    <Route path='/'>
                        <p className='header__profile'>{currentUser?.name}</p>
                        <Link className="header__link link" to="/login">Выход</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    );
}

export default Header;