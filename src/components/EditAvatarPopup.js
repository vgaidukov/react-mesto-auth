import { useEffect } from 'react';
import Popup from './Popup';
import { useForm } from '../hooks/hooks'
import Form from './Form';
import Input from './Input';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        setValues({ avatar: '' });
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: values.avatar
        });
    }

    return (
        <Popup
            name="change-avatar"
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form
                title="Обновить аватар"
                submitButtonName="Сохранить"
                submitButtonNameOnLoading="Сохранение ..."
                isLoading={isLoading}
                onSubmit={handleSubmit}
            >
                <label className="popup__field">
                    <Input
                        type={"url"}
                        id={"avatar-link-input"}
                        name={"avatar"}
                        className={"popup__input popup__input_type_img-link"}
                        placeholder={"Ссылка на картинку"}
                        required={true}
                        value={values.avatar}
                        onChange={handleChange}
                    >
                    </Input>
                </label>
            </Form>
        </Popup>
    )
}

export default EditAvatarPopup;