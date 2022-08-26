import Popup from "./Popup";

function InfoTooltip({
    infoTooltipMessage,
    name,
    onClose,
    isOpen
}
) {
    return (
        <Popup
            name={name}
            onClose={onClose}
            isOpen={isOpen}
            className={'popup__form'}
        >
            <img alt='message' src={infoTooltipMessage.img} />
            <h3 className={`popup__title popup__title_type_${name}`}>{infoTooltipMessage.title}</h3>
        </Popup>
    )
}

export default InfoTooltip;