import './Day.scss';
import dayIcon from '../../assets/icons/day-icon.svg'

function Day( { dayNumber, date } ) {
  return (
    <div className='day'>
        <div className='day--card'>
            <div className='day--card__icon'>
                <img src={dayIcon} alt="" />
            </div>
            <div className='day--card__text'>
                <h5>Day {dayNumber}</h5>
                <p>{date}</p>
            </div>
        </div>
        <div className='day--area'>
            <p>Drag Here</p>
        </div>
        <div className='day--line'></div>
    </div>
  )
}

export default Day
