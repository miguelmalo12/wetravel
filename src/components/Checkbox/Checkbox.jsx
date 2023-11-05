import './Checkbox.scss'

const Checkbox = (props) => {

    const { text } = props
    return (
        <div className="authentication-form__group--checkbox">
            <label htmlFor="" className="authentication-form__label--checkbox">{text}</label>
            <input type="checkbox" className="authentication-form__input--checkbox" />
        </div>
    )
}

export default Checkbox;