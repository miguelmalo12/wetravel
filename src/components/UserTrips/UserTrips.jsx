import "./UserTrips.scss";

import { ReactComponent as DateIcon } from '../../assets/icons/date.svg';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';



function UserTrips() {
  return (
    <div className="trips">
        <h2>Your Trips</h2>
        <div className="trips--container">
            <div className="trips--container__info">
                <div className="trips--container__info--entry">
                    <p>Destination</p>
                    <h5>Madrid</h5>
                </div>
                <div className="trips--container__info--entry">
                    <p>From</p>
                    <h5>12 Nov, 2023</h5>
                </div>
                <div className="trips--container__info--entry">
                    <p>To</p>
                    <h5>16 Nov, 2023</h5>
                </div>
                <div className="trips--container__info__delete">
                    <p>Delete</p>
                    <DeleteIcon />
                </div>
            </div>
           
            <div className="trips--container__view">
                <DateIcon />
                <p>View Trip</p>
            </div>
        </div>
    </div>
  )
}

export default UserTrips