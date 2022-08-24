import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as mestoAuth from './mestoAuth'

import EntranceForm from "./EntranceForm";
import PopupRegisterCheck from './PopupRegisterCheck'

import registerSucc from '../images/register-success.png';
import registerFail from '../images/register-fail.png';

function Register() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerPopupData, setRegisterPopupData] = useState({})
    const [isRegisterCheckPopupOpen, setRegisterCheckPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messageSuccess = {
        img: registerSucc,
        title: 'Вы успешно зарегистрировались!'
    }
    const messageFail = {
        img: registerFail,
        title: 'Что-то пошло не так! Попробуйте еще раз.'
    }

    const handlePopupClose = () => {
        setRegisterCheckPopupOpen(false)
        if (JSON.stringify(registerPopupData) === JSON.stringify(messageSuccess)) {
            history.push('/login');
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(password, email);
        setIsLoading(true);
        mestoAuth.register(password, email)
            .then((res) => {
                if (res) {
                    setIsLoading(false);
                    setRegisterPopupData(messageSuccess);
                    setRegisterCheckPopupOpen(true);
                } else {
                    setIsLoading(false);
                    setRegisterPopupData(messageFail)
                    setRegisterCheckPopupOpen(true)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <EntranceForm
                name="register"
                title="Регистрация"
                submitButtonName="Зарегистрироваться"
                submitButtonNameOnLoading="Регистрация ..."
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onEmailChange={handleEmailChange}
                onPasswordChange={handlePasswordChange}
                email={email}
                password={password}
            >
                <p className="entrance-page__text">Уже зарегистрированы?
                    <Link className="link entrance-page__link" to='/login'>Войти</Link>
                </p>
            </EntranceForm>
            <PopupRegisterCheck
                registerPopupData={registerPopupData}
                name={'register-check'}
                onClose={handlePopupClose}
                isOpen={isRegisterCheckPopupOpen}
            />
        </>

    );
}

export default Register;