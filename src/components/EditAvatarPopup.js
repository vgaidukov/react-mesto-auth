import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const avatarLinkRef = useRef();

    useEffect(() => {
        avatarLinkRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarLinkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            submitButtonName="Сохранить"
            submitButtonNameOnLoading="Сохранение ..."
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    type="url"
                    id="avatar-link-input"
                    name="img-link"
                    className="popup__input popup__input_type_img-link"
                    placeholder="Ссылка на картинку"
                    required
                    ref={avatarLinkRef} />
                <span className="popup__input-error avatar-link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;