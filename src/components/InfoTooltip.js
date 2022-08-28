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
            isOpen={isOpen}
            onClose={onClose}
        >
            <img alt='message' src={infoTooltipMessage.img} />
            <h3 className={`popup__title popup__title_type_${name}`}>{infoTooltipMessage.title}</h3>
        </Popup>
    )
}

export default InfoTooltip;