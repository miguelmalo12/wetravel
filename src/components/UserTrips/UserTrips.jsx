import "./UserTrips.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// recoil state
import { useRecoilState } from "recoil";
import { modalState } from "../../state/modalState";

// components
import UserTripCard from "./UserTripCard";
import Modal from "../Modal/Modal";

// .env variables
const API_URL = process.env.REACT_APP_BACKEND_URL;

function UserTrips() {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setModalOpen] = useRecoilState(modalState);

  // GET Trips from db
  useEffect(() => {
    const getTrips = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        const userData = storedUserData ? JSON.parse(storedUserData) : null;
        const userId = userData ? userData.user_id : null;

        if (!userId) {
          console.error("User ID is missing");
          return;
        }
        
        const response = await axios.get(`${API_URL}/plan?user_id=${userId}`, {
          withCredentials: true,
        });
        setTrips(response.data);
      } catch (error) {
        console.error("Error getting trips:", error);
      }
    };

    getTrips();
  }, []);

  // Handles the delete click on the modal
  const handleDeleteConfirm = (tripId) => {
    console.log("Deleting trip with ID:", tripId);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="trips">
      <h2>Your Trips</h2>
      {trips.map((trip) => (
        <UserTripCard key={trip.trip_id} trip={trip} />
      ))}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          textContent={`Are you sure you want to delete the event?`}
          buttonText="Delete"
          onButtonClick={() => console.log("Delete confirmed")}
          onCloseClick={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UserTrips;
