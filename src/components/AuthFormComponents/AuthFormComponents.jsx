import './AuthFormComponents.scss';

export const FormGroupInput = ({ label, type, name, onChange, customRef, handleEmailValidation }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <input type={type} onChange={(handleEmailValidation) ? (event) => {
                onChange(event)
                handleEmailValidation(event)
            } : (onChange)} id={name} name={name} ref={customRef} className="authentication-form__input" />
        </div>
    )
}

export const FormGroupSelect = ({ label, optionArray, name, defaultOption, setSelectedValue }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <select onChange={e => {
                setSelectedValue(e.target.value)
            }} id={name} name={name} className="authentication-form__input">
                <option className='authentication-form__input--option' value="" defaultValue>{defaultOption}</option>
                {optionArray.map(option => {
                    return (
                        <option key={option} className='authentication-form__input--option' value={option} >{option}</option>
                    )
                })}
            </select>
        </div>
    )
}

export const FormGroupCheckbox = ({ label, optionArray, name, type, setSelectedArray, selectedArray }) => {

    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <div className={`authentication-form__checkbox-container`}>
                {
                    optionArray.map(option => {
                        return (
                            <div className="authentication-form__group--checkbox" key={option}>
                                <label htmlFor={name} className="authentication-form__label--checkbox">{option}</label>
                                <input
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedArray([...selectedArray, e.target.value]);
                                        } else {
                                            setSelectedArray(selectedArray.filter(item => item !== e.target.value));
                                        }
                                        console.log(selectedArray)
                                    }}
                                    type={type}
                                    className="authentication-form__input--checkbox"
                                    value={option}
                                    name={name} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



