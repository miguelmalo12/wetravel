import "./TravelPlanner.scss";

// components
import Day from "../Day/Day";

import { addDays, format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

//icons
import transportationIcon from "../../assets/icons/TransportationIcon.png";
import accommodationIcon from "../../assets/icons/AccommodationIcon.png";
import activityIcon from "../../assets/icons/ActivityIcon.png";
import restaurantIcon from "../../assets/icons/RestaurantIcon.png";

function TravelPlanner({ location, dayCount, startDate, onSave }) {

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
              <h5>Add Transportation</h5>
            </div>
            <div
              className="planner--plan__events--items--item"
              draggable="true"
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", "Add Accommodation,accommodation");
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
                e.dataTransfer.setData("text/plain", "Add Restaurant,restaurant");
              }}
            >
              <img src={restaurantIcon} alt="" />
              <h5>Add Restaurant</h5>
            </div>
          </div>
          <div className="planner--plan__events--button">
            <button className="primary-button" onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelPlanner;
