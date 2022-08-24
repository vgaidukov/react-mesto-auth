import { useState } from "react";
import { useHistory } from "react-router-dom";
import EntranceForm from "./EntranceForm";
import * as mestoAuth from './mestoAuth'

function Login({ onLogin }) {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        mestoAuth.authorize(password, email)
            .then((res) => {
                if (res) {
                    console.log(res)
                    setIsLoading(false);
                    setEmail('');
                    setPassword('');
                    onLogin(email);
                    history.push('/');
                } else {
                    console.log(res);
                    setIsLoading(false);
                    onLogin(false);

                }
            })
            .catch(err => console.log(err));
    }

    return (
        <EntranceForm
            name="login"
            title="Вход"
            submitButtonName="Войти"
            submitButtonNameOnLoading="Вход ..."
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            email={email}
            password={password}
        />
    );
}

export default Login;