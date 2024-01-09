import "./TravelPlanner.scss";
import { useState, useEffect } from 'react';
import axios from 'axios';

import { addDays, differenceInCalendarDays, parseISO, format } from 'date-fns';

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

function TravelPlannerView({ onUpdate, updateFeedback }) {
    
  const [viewTrip, setViewTrip] = useRecoilState(viewTripState); 
  const [notes, setNotes] = useState(viewTrip.notes || 'Enter any trip comments, notes, links, etc.');

  // Generate an array of dates from start_date to end_date
  const startDate = parseISO(viewTrip.start_date);
  const endDate = parseISO(viewTrip.end_date);
  const dayCount = differenceInCalendarDays(endDate, startDate) + 1; // +1 to include end date
  const dates = Array.from({ length: dayCount }, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));

  // Needed for deleting event flow
  const [isModalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Variable for mobile drag and drop
  const [draggedData, setDraggedData] = useState(null);

  // Used for mobile drag and drop
  const handleDragStart = (data) => {
    setDraggedData(data);
  };

  const handleTouchMove = (e) => {
    const touchLocation = e.touches[0];
    const target = document.elementFromPoint(
      touchLocation.clientX,
      touchLocation.clientY
    );

    if (draggedData && target) {
      // Logic for mobile drag and drop
    }
  };

  // Update viewTrip state when notes change
  useEffect(() => {
    if (viewTrip.notes !== notes) {
      setViewTrip({ ...viewTrip, notes: notes });
    }
  }, [notes, viewTrip, setViewTrip]);

  // Logic for notes textarea
  useEffect(() => {
    setNotes(viewTrip.notes || 'Enter any trip comments, notes, links, etc.');
  }, [viewTrip.notes]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) {
        console.error("Event not found");
        return;
    }
    
    // Check if the event has a tempId (not saved in the database yet)
    if (eventToDelete.tempId) {
        // Remove the event from the UI and state without making a server call
        removeEventFromState(eventToDelete.tempId);
    } else if (viewTrip.trip_id && eventToDelete.event_id) {
        // If the event is saved in the database, make a server call to delete it
        try {
        await axios.delete(`${API_URL}/plan/${viewTrip.trip_id}/event/${eventToDelete.event_id}`);
        console.log("Event deleted successfully");
        removeEventFromState(eventToDelete.event_id);
        } catch (error) {
        console.error("Error deleting event:", error);
        }
    } else {
        console.error("Invalid event or trip ID");
    }

    setModalOpen(false);
    setEventToDelete(null);
  };

  // Helper function to remove an event from the state
  const removeEventFromState = (identifier) => {
      const updatedEvents = viewTrip.events.filter(event =>
          event.event_id !== identifier && event.tempId !== identifier
      );

      // Update viewTrip state with the new events array
      setViewTrip({ ...viewTrip, events: updatedEvents });
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
                    key={`${date}-${viewTrip.events.length}`}
                    dayNumber={index + 1}
                    date={date}
                    eventsProp={getEventsForDate(date)}
                    onDeleteEvent={handleDeleteEvent}
                    draggedData={draggedData}
                    setDraggedData={setDraggedData}
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
              onTouchStart={() => handleDragStart({ title: "Add Transportation", type: "transportation" })}
              onTouchMove={handleTouchMove}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Transportation,transportation"
                );
              }}
            >
              <img src={transportationIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Transportation</span>
                <span className="mobile-text">Transport</span>
              </h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              onTouchStart={() => handleDragStart({ title: "Add Accommodation", type: "accommodation" })}
              onTouchMove={handleTouchMove}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Accommodation,accommodation"
                );
              }}
            >
              <img src={accommodationIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Accommodation</span>
                <span className="mobile-text">Accomm.</span>
              </h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              onTouchStart={() => handleDragStart({ title: "Add Activity", type: "activity" })}
              onTouchMove={handleTouchMove}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Activity,activity");
              }}
            >
              <img src={activityIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Activity</span>
                <span className="mobile-text">Activity</span>
              </h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              onTouchStart={() => handleDragStart({ title: "Add Restaurant", type: "restaurant" })}
              onTouchMove={handleTouchMove}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  "Add Restaurant,restaurant"
                );
              }}
            >
              <img src={restaurantIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Restaurant</span>
                <span className="mobile-text">Restaurant</span>
              </h5>
            </div>
          </div>
          <div className="planner--plan__events--button">
            <button className="primary-button" onClick={onUpdate}>
              Update
            </button>
            {updateFeedback.message && (
              <div className={`feedback-message ${updateFeedback.type}`}>
                {updateFeedback.message}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="planner--notes">
          <h3>Trip Notes:</h3>
          <textarea
            name="trip-notes" id="trip-notes" cols="30" rows="6"
            value={notes}
            onChange={handleNotesChange}
          >
          </textarea>
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
