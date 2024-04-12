import "./TravelPlanner.scss";
import { useState, useEffect } from "react";

// components
import Day from "../Day/Day";
import EventItem from "../EventItem/EventItem";

import { addDays, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

//icons
import transportationIcon from "../../assets/icons/TransportationIcon.png";
import accommodationIcon from "../../assets/icons/AccommodationIcon.png";
import activityIcon from "../../assets/icons/ActivityIcon.png";
import restaurantIcon from "../../assets/icons/RestaurantIcon.png";

function TravelPlanner({ location, dayCount, startDate, notes: initialNotes, onNotesChange, onSave, isLoading }) {
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
                      setActiveItem={setActiveItem}
                      touchedData={touchedData}
                      setTouchedData={setTouchedData}
                    />;
          })}
        </div>
        <div className="planner--plan__events">
          <div className="planner--plan__events--items">
            <EventItem title="Add Transportation" type="transportation" activeItem={activeItem} onItemSelect={handleTouchStart} icon={transportationIcon} />
            <EventItem title="Add Accommodation" type="accommodation" activeItem={activeItem} onItemSelect={handleTouchStart} icon={accommodationIcon} />
            <EventItem title="Add Activity" type="activity" activeItem={activeItem} onItemSelect={handleTouchStart} icon={activityIcon} />
            <EventItem title="Add Restaurant" type="restaurant" activeItem={activeItem} onItemSelect={handleTouchStart} icon={restaurantIcon} />
          </div>
          <div className="planner--plan__events--button">
            <button className={`primary-button ${isLoading ? 'loading' : ''}`} onClick={onSave}>
              {isLoading ? (
                <>
                  <l-ring color='#FD5056' size='20' stroke='2.5'></l-ring>
                  Loading...
                </>
              ) : (
                "Save"
              )}
            </button>
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
