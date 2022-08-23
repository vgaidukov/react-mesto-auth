function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image popup_dark-background ${card && 'popup_opened'}`}>
            <div className="popup__container popup__content">
                <button
                    type="button"
                    className="popup__close-button popup__close-button_type_image button"
                    onClick={onClose}>
                </button>
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <p className="popup__label">{card?.name}</p>
            </div>
        </div >
    )
}

export default ImagePopup;