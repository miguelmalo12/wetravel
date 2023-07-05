import './Checkbox.scss'

const Checkbox = (props) =>{

    const {text} = props
    return(
        <div className="form__group form__group--checkbox">
            <input type="checkbox" name={text} id={text} className='form__input form__input--checkbox' />
            <label htmlFor={text} className='form__label form__label--checkbox'>{text}</label>
        </div>
    )
}

export default Checkbox;