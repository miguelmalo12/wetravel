import "./Day.scss";
import { useState } from "react";
import dayIcon from "../../assets/icons/day-icon.svg";

function Day({ dayNumber, date }) {
    const [events, setEvents] = useState([]);
  
    return (
    <div className="day">
      <div className="day--card">
        <div className="day--card__icon">
          <img src={dayIcon} alt="" />
        </div>
        <div className="day--card__text">
          <h5>Day {dayNumber}</h5>
          <p>{date}</p>
        </div>
      </div>
      {events.map((event, index) => (
          <div className="day--entry" key={index}>
            <p>{event.title} </p><input type="text" />
          </div>
        ))}
      <div
        className="day--area"
        onDragOver={(e) => {
          e.preventDefault(); // This is necessary to allow a drop
        }}
        onDrop={(e) => {
          e.preventDefault();
          const eventTitle = e.dataTransfer.getData("text/plain");
          setEvents([...events, { title: eventTitle }]);
        }}
      >
        <p>Drag Here</p>
        
      </div>
      <div className="day--line"></div>
    </div>
  );
}

export default Day;
