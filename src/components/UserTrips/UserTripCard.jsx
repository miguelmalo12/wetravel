import "./UserTrips.scss";

// icons
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

function UserTripCard({ trip, onDeleteClick, onViewClick }) {

  const handleDeleteIconClick = () => {
    onDeleteClick();
  };

  // Formats data from db to display in the card
  function formatDate(dateString) {
    const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  return (
    <div className="trips--container">
      <div className="trips--container__info">
        <div className="trips--container__info--entry">
          <p>Destination</p>
          <h5>{trip.destination}</h5>
        </div>
        <div className="trips--container__info--entry">
          <p>From</p>
          <h5>{formatDate(trip.start_date)}</h5>
        </div>
        <div className="trips--container__info--entry">
          <p>To</p>
          <h5>{formatDate(trip.end_date)}</h5>
        </div>
        <div
          onClick={handleDeleteIconClick}
          className="trips--container__info__delete"
        >
          <p>Delete</p>
          <DeleteIcon />
        </div>
      </div>
      <div className="trips--container__view" onClick={() => onViewClick(trip.trip_id)}>
        <DateIcon />
        <p>View Trip</p>
      </div>
    </div>
  );
}

export default UserTripCard;
