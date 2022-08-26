function EntranceForm({
    name,
    title,
    submitButtonName,
    submitButtonNameOnLoading,
    children,
    onSubmit,
    isLoading,
    onChange,
    email,
    password
}) {
    return (
        <div className={`entrance-page entrance-page_type_${name}`}>
            <form
                name={name}
                className="entrance-page__form"
                onSubmit={onSubmit}>
                <h3 className={`entrance-page__title entrance-page__title_type_${name}`}>{title}</h3>
                <label className="entrance-page__field">
                    <input
                        type="email"
                        id="email-input"
                        name="email"
                        className="entrance-page__input entrance-page__input_type_email"
                        placeholder="Email"
                        required
                        minLength="2"
                        maxLength="40"
                        value={email}
                        onChange={onChange} />
                </label>
                <label className="entrance-page__field">
                    <input
                        type="password"
                        id="password-input"
                        name="password"
                        className="entrance-page__input entrance-page__input_type_password"
                        placeholder="Пароль"
                        required
                        minLength="2"
                        maxLength="40"
                        value={password}
                        onChange={onChange} />
                </label>
                <button
                    type="submit"
                    className="button entrance-page__submit-button">
                    {!isLoading ? submitButtonName : submitButtonNameOnLoading}
                </button>
                {children}
            </form>
        </div>
    )
}

export default EntranceForm;