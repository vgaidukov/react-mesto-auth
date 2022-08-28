import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({
    name,
    isOpen,
    onClose,
    title,
    submitButtonName,
    submitButtonNameOnLoading,
    onSubmit,
    isLoading,
    children }
) {
    return (
        <Popup
            name={name}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form
                name={name}
                title={title}
                submitButtonName={submitButtonName}
                submitButtonNameOnLoading={submitButtonNameOnLoading}
                isLoading={isLoading}
                onSubmit={onSubmit}
            >
                {children}
            </Form>
        </Popup >


        // <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        //     <div className={`popup__window popup__window_type_${name}`}>
        //         <button
        //             type="button"
        //             className="popup__close-button popup__close-button_type_image button"
        //             onClick={onClose}>
        //         </button>
        //         <form
        //             name={name}
        //             className="popup__form"
        //             noValidate
        //             onSubmit={onSubmit}>
        //             <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
        //             {children}
        //             <button
        //                 type="submit"
        //                 className="button popup__submit-button">
        //                 {!isLoading ? submitButtonName : submitButtonNameOnLoading}
        //             </button>
        //         </form>
        //     </div>
        // </ div>
    )
}

export default PopupWithForm;