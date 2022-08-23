import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description
        });
    }


    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            submitButtonName="Сохранить"
            submitButtonNameOnLoading="Сохранение ..."
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    type="text"
                    id="profile-name-input"
                    name="profile-name"
                    className="popup__input popup__input_type_name"
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleNameChange} />
                <span className="popup__input-error profile-name-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    id="profile-description-input"
                    name="profile-description"
                    className="popup__input popup__input_type_description"
                    placeholder="Описание"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleDescriptionChange} />
                <span className="popup__input-error profile-description-input-error" ></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
