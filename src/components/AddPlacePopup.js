import { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
    const cardNameRef = useRef();
    const imgLinkRef = useRef();

    useEffect(() => {
        cardNameRef.current.value = '';
        imgLinkRef.current.value = '';
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: cardNameRef.current.value,
            link: imgLinkRef.current.value
        })
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            submitButtonName="Создать"
            submitButtonNameOnLoading="Создание ..."
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    type="text"
                    id="card-name-input"
                    name="card-name"
                    className="popup__input popup__input_type_card-name"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="40"
                    ref={cardNameRef} />
                <span className="popup__input-error card-name-input-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    id="img-link-input"
                    name="img-link"
                    className="popup__input popup__input_type_img-link"
                    placeholder="Ссылка на картинку"
                    required
                    ref={imgLinkRef} />
                <span className="popup__input-error img-link-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;