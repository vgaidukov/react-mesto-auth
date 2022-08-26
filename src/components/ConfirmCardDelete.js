import Popup from './Popup';
import Form from './Form';

function ConfirmCardDelete({ card, isOpen, onClose, onConfirmDelete, isLoading }) {
    function handleSubmit(e) {
        e.preventDefault();
        onConfirmDelete(card)
    }

    return (
        <Popup
            name="card-delete-confirmation"
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form
                title="Вы уверены?"
                submitButtonName="Да"
                submitButtonNameOnLoading="Удаление ..."
                isLoading={isLoading}
                onSubmit={handleSubmit}
            />
        </Popup >
    )
}

export default ConfirmCardDelete;