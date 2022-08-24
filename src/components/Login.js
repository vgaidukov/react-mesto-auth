import EntranceForm from "./EntranceForm";

function Login({ isLoading, handleLogin }) {

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin();
        // Передаём значения управляемых компонентов во внешний обработчик
        // onLogin({
        //     name: name,
        //     about: description
        // });
    }

    return (
        <EntranceForm
            name="login"
            title="Вход"
            submitButtonName="Войти"
            submitButtonNameOnLoading="Вход ..."
            isLoading={isLoading}
            onSubmit={handleSubmit}
        />
    );
}

export default Login;