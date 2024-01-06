import "./TravelPlanner.scss";
import { useState, useEffect } from "react";

// components
import Day from "../Day/Day";

import { addDays, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

//icons
import transportationIcon from "../../assets/icons/TransportationIcon.png";
import accommodationIcon from "../../assets/icons/AccommodationIcon.png";
import activityIcon from "../../assets/icons/ActivityIcon.png";
import restaurantIcon from "../../assets/icons/RestaurantIcon.png";

function TravelPlanner({ location, dayCount, startDate, notes: initialNotes, onNotesChange, onSave }) {
  const [notes, setNotes] = useState(initialNotes || 'Enter any trip comments, notes, links, etc.');

  useEffect(() => {
    setNotes(initialNotes || 'Enter any trip comments, notes, links, etc.');
  }, [initialNotes]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    onNotesChange(e.target.value);
  };

  return (
    <div className="planner">
      <div className="planner--title">
        <h2>Your Trip to {location}</h2>
      </div>
      <div className="planner--plan">
        <div className="planner--plan__days">
        {Array.from({ length: dayCount }, (_, i) => {
            const dateUTC = addDays(startDate, i);
            const zonedDate = utcToZonedTime(dateUTC, Intl.DateTimeFormat().resolvedOptions().timeZone);
            const formattedDate = format(zonedDate, "E, dd MMM");
            return <Day key={i} dayNumber={i + 1} date={formattedDate} />;
          })}
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
                e.dataTransfer.setData("text/plain", "Add Transportation,transportation");
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
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Accommodation,accommodation");
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
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Restaurant,restaurant");
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
            <button className="primary-button" onClick={onSave}>Save</button>
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
    </div>
  );
}

export default TravelPlanner;
