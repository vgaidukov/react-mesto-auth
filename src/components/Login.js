import { useHistory } from "react-router-dom";
import EntranceForm from "./EntranceForm";
import { useForm } from '../hooks/hooks';

function Login({ onLogin, isLoading }) {

    const history = useHistory();
    const { values, handleChange, setValues } = useForm({});
    const email = values.email || '';
    const password = values.password || '';


    const resetForm = () => {
        setValues({
            email: '',
            password: ''
        })
    };

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ password, email })
            .then(resetForm)
            .then(() => history.push('/'))
            .catch((err) => console.log(err.message || 'Что-то пошло не так'));
    }

    // к сожалению, не хватило времени переписать форму и инпуты на компоненты, но принцип понятен, спасибо! :)

    return (
        <EntranceForm
            name="login"
            title="Вход"
            submitButtonName="Войти"
            submitButtonNameOnLoading="Вход ..."
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onChange={handleChange}
            email={email}
            password={password}
        />
    );
}

export default Login;