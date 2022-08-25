import { useState } from "react";
import { useHistory } from "react-router-dom";
import EntranceForm from "./EntranceForm";

function Login({ onLogin, isLoading }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ password, email })
            .then(resetForm)
            .then(() => history.push('/'))
            .catch((err) => console.log(err.message || 'Что-то пошло не так'));
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