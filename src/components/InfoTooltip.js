function InfoTooltip({
    infoTooltipData,
    name,
    onClose,
    isOpen
}
) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__window popup__window_type_${name} popup__content`}>
                <button
                    type="button"
                    className="popup__close-button popup__close-button_type_image button"
                    onClick={onClose}>
                </button>
                <img alt='message' src={infoTooltipData.img} />
                <h3 className={`popup__title popup__title_type_${name}`}>{infoTooltipData.title}</h3>
            </div>
        </ div>
    )
}

export default InfoTooltip;