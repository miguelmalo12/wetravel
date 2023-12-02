import "./TravelPlanner.scss";
import { useState } from 'react';
import axios from 'axios';

import { addDays, differenceInCalendarDays, parseISO, format, set } from 'date-fns';

// recoil state
import { useRecoilState } from "recoil";
import { viewTripState } from "../../state/viewTripState";

// components
import DayView from "../Day/DayView";
import Modal from '../Modal/Modal';

//icons
import transportationIcon from "../../assets/icons/TransportationIcon.png";
import accommodationIcon from "../../assets/icons/AccommodationIcon.png";
import activityIcon from "../../assets/icons/ActivityIcon.png";
import restaurantIcon from "../../assets/icons/RestaurantIcon.png";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function TravelPlannerView({ onSave }) {
    
  const [viewTrip, setViewTrip] = useRecoilState(viewTripState); 

  // Generate an array of dates from start_date to end_date
  const startDate = parseISO(viewTrip.start_date);
  const endDate = parseISO(viewTrip.end_date);
  const dayCount = differenceInCalendarDays(endDate, startDate) + 1; // +1 to include end date
  const dates = Array.from({ length: dayCount }, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));

  // Needed for deleting event flow
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('Deleting event:', eventToDelete);
    if (!eventToDelete || !viewTrip.trip_id) {
      console.error("Event ID or Trip ID not found");
      return;
    }
    
    try {
        await axios.delete(`${API_URL}/plan/${viewTrip.trip_id}/event/${eventToDelete.event_id}`);
        console.log("Event deleted successfully");

        // Remove the deleted event from your events array
        const updatedEvents = viewTrip.events.filter(event => event.event_id !== eventToDelete.event_id);
        
        // Update your viewTrip state with the new events array
        const updatedTripDetails = {
          ...viewTrip,
          events: updatedEvents
        };
        // This will trigger a re-render of the DayView component
        setViewTrip(updatedTripDetails);

        console.log("Event deleted successfully");
  
    } catch (error) {
        console.error("Error deleting event:", error);
    }

    setModalOpen(false);
    setEventToDelete(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEventToDelete(null);
  };

  // Helper function to find events for a given date
  const getEventsForDate = (date) => {
    return viewTrip.events.filter(event => event.date === date);
  };

  return (
    <div className="planner">
      <div className="planner--title">
        <h2>Your Trip to {viewTrip.destination}</h2>
      </div>
      <div className="planner--plan">
        <div className="planner--plan__days">
            {dates.map((date, index) => (
                <DayView
                    key={index}
                    dayNumber={index + 1}
                    date={date}
                    eventsProp={getEventsForDate(date)}
                    onDeleteEvent={handleDeleteEvent}
                />
            ))}
        </div>
        <div className="planner--plan__events">
          <div className="planner--plan__events--items">
            <div className="planner--plan__events--items--title">
              <h3>Events</h3>
            </div>
            <div
              className="planner--plan__events--items--item"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Transportation,transportation"
                );
              }}
            >
              <img src={transportationIcon} alt="" />
              <h5>Add Transportation</h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Accommodation,accommodation"
                );
              }}
            >
              <img src={accommodationIcon} alt="" />
              <h5>Add Accommodation</h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Activity,activity");
              }}
            >
              <img src={activityIcon} alt="" />
              <h5>Add Activity</h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Restaurant,restaurant"
                );
              }}
            >
              <img src={restaurantIcon} alt="" />
              <h5>Add Restaurant</h5>
            </div>
          </div>
          <div className="planner--plan__events--button">
            <button className="primary-button" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          textContent={`Are you sure you want to delete the event "${eventToDelete?.event_description}"?`}
          buttonText="Delete"
          onButtonClick={handleDeleteConfirm}
          onCloseClick={handleCloseModal}
        />
      )}
    </div>
  );
}

export default TravelPlannerView;
