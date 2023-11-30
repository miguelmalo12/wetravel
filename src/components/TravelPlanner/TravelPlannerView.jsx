import "./TravelPlanner.scss";

import { addDays, differenceInCalendarDays, parseISO, format } from 'date-fns';

// components
import DayView from "../Day/DayView";

//icons
import transportationIcon from "../../assets/icons/TransportationIcon.png";
import accommodationIcon from "../../assets/icons/AccommodationIcon.png";
import activityIcon from "../../assets/icons/ActivityIcon.png";
import restaurantIcon from "../../assets/icons/RestaurantIcon.png";

function TravelPlannerView({ tripDetails, onSave }) {
  console.log("tripDetails", tripDetails);

  // Generate an array of dates from start_date to end_date
  const startDate = parseISO(tripDetails.start_date);
  const endDate = parseISO(tripDetails.end_date);
  const dayCount = differenceInCalendarDays(endDate, startDate) + 1; // +1 to include end date
  const dates = Array.from({ length: dayCount }, (_, i) => format(addDays(startDate, i), 'yyyy-MM-dd'));

  // Helper function to find events for a given date
  const getEventsForDate = (date) => {
    return tripDetails.events.filter(event => event.date === date);
  };

  console.log(tripDetails.events);
  console.log('dates',dates)

  dates.forEach((date, index) => {
    console.log(`Finding events for date: ${date}`);

    const dayEvents = getEventsForDate(date);
    console.log(`Found ${dayEvents.length} events for date: ${date}`, dayEvents);
});

  return (
    <div className="planner">
      <div className="planner--title">
        <h2>Your Trip to {tripDetails.destination}</h2>
      </div>
      <div className="planner--plan">
        <div className="planner--plan__days">
            {dates.map((date, index) => (
                <DayView
                key={index}
                dayNumber={index + 1}
                date={date}
                eventsProp={getEventsForDate(date)}
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
    </div>
  );
}

export default TravelPlannerView;
