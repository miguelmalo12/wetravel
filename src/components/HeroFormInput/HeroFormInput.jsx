import './HeroFormInput.scss';
import { ButtonHeroFormSubmit } from '../Button/Button';
import { useFocusHandlers } from '../../utils/formUtils';

export const SingleHeroFormSelect = ({ icon, label, options, name, onChange }) => {
    const { isFocused, handleFocus, handleBlur } = useFocusHandlers();

    return (
        <div className={`hero-form-input__group-container ${isFocused ? 'focused' : ''}`}>
            <img src={icon} alt="" className="hero-form-input__icon" />
            <div className="hero-form-input__group">
                <label htmlFor={name} className="hero-form-input__label">{label}</label>
                <select id={name} onChange={onChange} type="text" name={name} className={`hero-form-input__input hero-form-input__input--select`} onFocus={handleFocus} onBlur={handleBlur}>
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export const SingleHeroFormSelectSubmit = ({ icon, label, options, name, onChange, onSubmit }) => {
    const { isFocused, handleFocus, handleBlur } = useFocusHandlers();
    return (
        <div className={`hero-form-input__group-container hero-form-input__group-container--submit-button ${isFocused ? 'focused' : ''}`}>
            <img src={icon} alt="" className="hero-form-input__icon" />
            <div className="hero-form-input__group">
                <label htmlFor={name} className="hero-form-input__label">{label}</label>
                <select id={name} onChange={onChange} type="text" name={name} className="hero-form-input__input hero-form-input__input--select" onFocus={handleFocus} onBlur={handleBlur}>
                    {options.map((option, index) => {
                        return (
                            <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                        )
                    })}
                </select>
            </div>
            <ButtonHeroFormSubmit onSubmit={onSubmit} className='hero-form-input__button' />
        </div>
    )
}


export const DoubleHeroFormSelect = ({ icon1, icon2, label1, label2, name1, name2, options1, options2, onChange }) => {
    const { isFocused: isFocused1, handleFocus: handleFocus1, handleBlur: handleBlur1 } = useFocusHandlers();
    const { isFocused: isFocused2, handleFocus: handleFocus2, handleBlur: handleBlur2 } = useFocusHandlers();


    return (
        <div className="hero-form-input__wrapper hero-form-input__wrapper--simple">
            <div className={`hero-form-input__group-container hero-form-input__group-container--double ${isFocused1 ? 'focused' : ''}`}>
                <img src={icon1} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name1} className="hero-form-input__label">{label1}</label>
                    <select id={name1} onChange={onChange} name={name1} type="text" className="hero-form-input__input hero-form-input__input--select" onFocus={handleFocus1} onBlur={handleBlur1}>
                        {options1.map((option, index) => {
                            return (
                                <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={`hero-form-input__group-container hero-form-input__group-container--double ${isFocused2 ? 'focused' : ''}`}>
                <img src={icon2} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name2} className="hero-form-input__label">{label2}</label>
                    <select id={name2} onChange={onChange} name={name2} type="text" className="hero-form-input__input hero-form-input__input--select" onFocus={handleFocus2} onBlur={handleBlur2}>
                        {options2.map((option, index) => {
                            return (
                                <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}


export const DoubleHeroFormSelectSubmit = ({ icon1, icon2, label1, label2, name1, name2, options1, options2, onChange, onSubmit }) => {
    const { isFocused: isFocused1, handleFocus: handleFocus1, handleBlur: handleBlur1 } = useFocusHandlers();
    const { isFocused: isFocused2, handleFocus: handleFocus2, handleBlur: handleBlur2 } = useFocusHandlers();


    return (
        <div className="hero-form-input__wrapper">
            <div className={`hero-form-input__group-container hero-form-input__group-container--double ${isFocused1 ? 'focused' : ''}`}>
                <img src={icon1} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name1} className="hero-form-input__label">{label1}</label>
                    <select id={name1} onChange={onChange} name={name1} type="text" className="hero-form-input__input hero-form-input__input--select" onFocus={handleFocus1} onBlur={handleBlur1}>
                        {options1.map((option, index) => {
                            return (
                                <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className={`hero-form-input__group-container hero-form-input__group-container--double hero-form-input__group-container--submit  hero-form-input__group-container--submit-button ${isFocused2 ? 'focused' : ''}`}>
                <img src={icon2} alt="" className="hero-form-input__icon" />
                <div className="hero-form-input__group">
                    <label htmlFor={name2} className="hero-form-input__label">{label2}</label>
                    <select id={name2} onChange={onChange} name={name2} type="text" className="hero-form-input__input hero-form-input__input--select" onFocus={handleFocus2} onBlur={handleBlur2}>
                        {options2.map((option, index) => {
                            return (
                                <option key={index} value={option} className="hero-form-input__input hero-form-input__input--option">{option}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <ButtonHeroFormSubmit onSubmit={onSubmit} className='hero-form-input__button' />
        </div>
    )
}
