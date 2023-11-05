import './AuthFormComponents.scss';

export const FormGroupInput = ({ label, type, name }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <input type={type} id={name} name={name} className="authentication-form__input" />
        </div>
    )
}

export const FormGroupSelect = ({ label, optionArray, name, defaultOption }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <select id={name} name={name} className="authentication-form__input">
                <option className='authentication-form__input--option' value="" disabled selected>{defaultOption}</option>
                {optionArray.map(option => {
                    return (
                        <option className='authentication-form__input--option' value={option} >{option}</option>
                    )
                })}
            </select>
        </div>
    )
}

export const FormGroupCheckbox = ({ label, optionArray, name, type }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <div className={`authentication-form__checkbox-container`}>
                {
                    optionArray.map(option => {
                        return (
                            <div className="authentication-form__group--checkbox">
                                <label htmlFor="" className="authentication-form__label--checkbox">{option}</label>
                                <input type={type} className="authentication-form__input--checkbox" value={option} name={name} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



