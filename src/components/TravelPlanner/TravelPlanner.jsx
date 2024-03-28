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

  // Variables for mobile touch and drop
  const [touchedData, setTouchedData] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // Used for mobile touch and drop
  const handleTouchStart = (data, event) => {
    if (activeItem && activeItem.title === data.title) {
      setActiveItem(null);
    } else {
      setActiveItem(data);
      setTouchedData(data);
    }
    
    event.preventDefault();
  };

  //Functions for notes textarea
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
            return <Day 
                      key={i}
                      dayNumber={i + 1}
                      date={formattedDate} 
                      touchedData={touchedData}
                      setTouchedData={setTouchedData}
                    />;
          })}
        </div>
        <div className="planner--plan__events">
          <div className="planner--plan__events--items">
            <div className="planner--plan__events--items--title">
              <h3>Events</h3>
            </div>
            <div
              className={`planner--plan__events--items--item ${activeItem && activeItem.title === "Add Transportation" ? 'active' : ''}`}
              onTouchStart={(e) => handleTouchStart({ title: "Add Transportation", type: "transportation" }, e)}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Transportation,transportation");
              }}
            >
              <img src={transportationIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Transportation</span>
              </h5>
            </div>
            <div
              className={`planner--plan__events--items--item ${activeItem && activeItem.title === "Add Accommodation" ? 'active' : ''}`}
              onTouchStart={(e) => handleTouchStart({ title: "Add Accommodation", type: "accommodation" }, e)}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Accommodation,accommodation");
              }}
            >
              <img src={accommodationIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Accommodation</span>
              </h5>
            </div>
            <div
              className={`planner--plan__events--items--item ${activeItem && activeItem.title === "Add Activity" ? 'active' : ''}`}
              onTouchStart={(e) => handleTouchStart({ title: "Add Activity", type: "activity" }, e)}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Activity,activity");
              }}
            >
              <img src={activityIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Activity</span>
              </h5>
            </div>
            <div
              className={`planner--plan__events--items--item ${activeItem && activeItem.title === "Add Restaurant" ? 'active' : ''}`}
              onTouchStart={(e) => handleTouchStart({ title: "Add Restaurant", type: "restaurant" }, e)}
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Restaurant,restaurant");
              }}
            >
              <img src={restaurantIcon} alt="" />
              <h5>
                <span className="desktop-text">Add Restaurant</span>
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
