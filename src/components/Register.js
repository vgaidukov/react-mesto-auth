import { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import EntranceForm from "./EntranceForm";
import InfoTooltip from "./InfoTooltip";

function Register({
    onRegister,
    infoTooltipData,
    isOpen,
    onClose,
    isLoading,
    messageSuccess
}) {
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

    function handlePopupClose() {
        onClose();
        if (JSON.stringify(infoTooltipData) === JSON.stringify(messageSuccess)) {
            history.push('/login');
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ password, email })
            .then(resetForm)
            .catch((err) => console.log(err.message || 'Что-то пошло не так'));
    };

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
            <InfoTooltip
                infoTooltipData={infoTooltipData}
                name={'info-tooltip'}
                onClose={handlePopupClose}
                isOpen={isOpen}
            />
        </>

    );
}

export default Register;