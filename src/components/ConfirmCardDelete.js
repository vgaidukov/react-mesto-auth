import PopupWithForm from './PopupWithForm';

function ConfirmCardDelete({ card, isOpen, onClose, onConfirmDelete, isLoading }) {
    // console.log(isLoading);
    function handleSubmit(e) {
        e.preventDefault();

        onConfirmDelete(card)
    }

    return (
        <PopupWithForm
            name="card-delete-confirmation"
            title="Вы уверены?"
            submitButtonName="Да"
            submitButtonNameOnLoading="Удаление ..."
            isLoading={isLoading}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} />
    )
}

export default ConfirmCardDelete;