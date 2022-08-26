import { useEffect } from "react";

function Popup({
    name,
    onClose,
    isOpen,
    children
}
) {
    useEffect(() => {
        if (!isOpen) return;

        // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', closeByEscape)
        return () => document.removeEventListener('keydown', closeByEscape)
    }, [isOpen, onClose])

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
            onClick={handleOverlay}
        >
            <div className={`popup__window popup__window_type_${name} popup__content`}>
                <button
                    type="button"
                    className="popup__close-button popup__close-button_type_image button"
                    onClick={onClose}>
                </button>

                {children}

            </div>
        </ div>
    )
}

export default Popup;