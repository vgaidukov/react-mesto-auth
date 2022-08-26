function Form({
    name,
    children,
    onSubmit,
    title,
    isLoading,
    submitButtonName,
    submitButtonNameOnLoading
}
) {
    return (
        <form
            name={name}
            className="popup__form"
            onSubmit={onSubmit}>
            <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>

            {children}

            <button
                type="submit"
                className="button popup__submit-button">
                {!isLoading ? submitButtonName : submitButtonNameOnLoading}
            </button>
        </form>
    )
}

export default Form;