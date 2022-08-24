function PopupRegisterCheck({
    registerPopupData,
    name,
    onClose,
    isOpen
}
) {
    console.log(registerPopupData);
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__window popup__window_type_${name} popup__content`}>
                <button
                    type="button"
                    className="popup__close-button popup__close-button_type_image button"
                    onClick={onClose}>
                </button>
                <img src={registerPopupData.img} />
                <h3 className={`popup__title popup__title_type_${name}`}>{registerPopupData.title}</h3>
            </div>
        </ div>
    )
}

export default PopupRegisterCheck;