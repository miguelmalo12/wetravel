import './FormInput.scss';
import Checkbox from '../Checkbox/Checkbox';

const FormInput = (props) =>{
    const {name, placeholder, text , type, className, dataArray} = props
    if (dataArray){
        return(
            <div className="form__group">
                        <label htmlFor="password" className="form__label">{text}</label>
                        <div className={`form__input-container ${className}`}>
                            {
                            dataArray.map(item=>{
                                return(
                                    <Checkbox text={item}/>
                                )
                            })
                            }
                            
                        </div>
                    </div>
        )
    }
    else{
    return(
        <div className={`form__group ${className}`}>
            <label htmlFor={name} className='form__label'>{text}</label>
            <input type={type} className="form__input" placeholder={placeholder} name={name}/>
        </div>
    )
}

}
export default FormInput;