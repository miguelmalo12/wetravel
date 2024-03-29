import './AuthFormComponents.scss';

export const FormGroupInput = ({ label, type, name, onChange, customRef, required }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <input required={required} type={type} onChange={onChange} id={name} name={name} ref={customRef} className="authentication-form__input" />
        </div>
    )
}

export const FormGroupSelect = ({ label, optionArray, name, defaultOption, setSelectedValue, required }) => {
    return (
        <div className="authentication-form__group">
            <label htmlFor={name} className="authentication-form__label">{label}</label>
            <select required={required} onChange={e => {
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

export const FormGroupCheckbox = ({ label, optionArray, name, type, setSelectedArray, selectedArray, required }) => {

    return (
        <div className="authentication-form__group">
            <p className="authentication-form__label">{label}</p>
            <div className={`authentication-form__checkbox-container`}>
                {
                    optionArray.map(option => {
                        return (
                            <div className="authentication-form__group--checkbox" key={option}>
                                <label htmlFor={(type === 'radio' ? `${name}-${option}` : `${option}-${name}`)} className="authentication-form__label--checkbox">{option}</label>
                                <input
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedArray([...selectedArray, e.target.value]);
                                        } else {
                                            setSelectedArray(selectedArray.filter(item => item !== e.target.value));
                                        }
                                    }}
                                    type={type}
                                    className="authentication-form__input--checkbox"
                                    value={option}
                                    name={(type === 'radio' ? name : `${option}-${name}`)}
                                    id={(type === 'radio' ? `${name}-${option}` : `${option}-${name}`)}
                                    required={required} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}



