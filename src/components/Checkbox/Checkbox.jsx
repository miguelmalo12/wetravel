import './Checkbox.scss'

const Checkbox = (props) =>{

    const {text} = props
    return(
        <div className="form__checkbox">
            <input type="checkbox" name={text} id={text} className='form__input form__input--checkbox' />
            <label htmlFor={text} className='form__checkbox-label'>{text}</label>
        </div>
    )
}

export default Checkbox;