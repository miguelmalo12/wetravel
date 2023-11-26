import "./UserTrips.scss";
import { useState } from "react";

// recoil state
import { useRecoilState } from "recoil";
import { modalState } from "../../state/modalState";

// icons
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

function UserTripCard({ trip }) {
  const [setModalOpen] = useRecoilState(modalState);

  // Opens modal after clicking delete
  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  // Formats data from db to display in the card
  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
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
          onClick={() => handleDeleteClick()}
          className="trips--container__info__delete"
        >
          <p>Delete</p>
          <DeleteIcon />
        </div>
      </div>
      <div className="trips--container__view">
        <DateIcon />
        <p>View Trip</p>
      </div>
    </div>
  );
}

export default UserTripCard;
