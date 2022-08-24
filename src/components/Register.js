import EntranceForm from "./EntranceForm";

function Register({ isLoading, handleRegister }) {


    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        handleRegister();
        // Передаём значения управляемых компонентов во внешний обработчик
        // onLogin({
        //     name: name,
        //     about: description
        // });
    }

    return (
        <EntranceForm
            name="register"
            title="Регистрация"
            submitButtonName="Зарегистрироваться"
            submitButtonNameOnLoading="Регистрация ..."
            isLoading={isLoading}
            onSubmit={handleSubmit}
        >
            <p className="entrance-page__text">Уже зарегистрированы?
                <a className="link entrance-page__link" href='#'>Войти</a>
            </p>

        </EntranceForm>
    );
}

export default Register;