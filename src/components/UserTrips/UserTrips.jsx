import "./UserTrips.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// recoil state
import { useRecoilState } from "recoil";
import { userTripsModalState } from "../../state/modalState";
import { viewTripState } from "../../state/viewTripState";

// components
import UserTripCard from "./UserTripCard";
import Modal from "../Modal/Modal";

// .env variables
const API_URL = process.env.REACT_APP_BACKEND_URL;

function UserTrips({ setViewTripClicked }) {
  const [trips, setTrips] = useState([]);
  const [isModalOpen, setModalOpen] = useRecoilState(userTripsModalState);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [viewTrip, setViewTrip] = useRecoilState(viewTripState);

  // GET All Trips from db
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

  // DELETE Trip from db
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/plan/${selectedTripId}`, {
        withCredentials: true,
      });
      setTrips(trips.filter(trip => trip.trip_id !== selectedTripId));
      console.log("Trip deleted successfully!");

      if (viewTrip && viewTrip.trip_id === selectedTripId) {
        setViewTrip(null); // Reset viewTripState
        setViewTripClicked(false); // Close TravelPlannerView
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
    setModalOpen(false);
  };

  // GET Specific Trip from db when clicking View Trip
  const handleViewClick = async (tripId) => {
    try {
      const response = await axios.get(`${API_URL}/plan/${tripId}`, {
        withCredentials: true,
      });

      // Sets trip data to recoil state
      setViewTrip(response.data);
      setViewTripClicked(true); // Used for the scroll behaviour
    } catch (error) {
      console.error("Error getting trip details:", error);
    }
  };

  // Opens modal after clicking delete
  const handleDeleteClick = (tripId) => {
    setSelectedTripId(tripId);
    setModalOpen(true);
  };

  return (
    <div className="trips">
      {trips.length > 0 && <h2>Your Trips</h2>} {/* Render header only if there are trips */}
      {trips.map((trip) => (
        <UserTripCard
          key={trip.trip_id}
          trip={trip}
          onDeleteClick={() => handleDeleteClick(trip.trip_id)}
          onViewClick={handleViewClick}
        />
      ))}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          textContent={`Are you sure you want to delete this trip?`}
          buttonText="Delete"
          onButtonClick={handleDeleteConfirm}
          onCloseClick={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UserTrips;
