import "./Day.scss";
import { useState, useEffect } from "react";

// recoil state
import { useRecoilState } from "recoil";
import { dayViewModalState } from "../../state/modalState";
import { tripInfoState } from "../../state/tripState";
import { viewTripState } from "../../state/viewTripState";
import { updatedTripState } from "../../state/updatedTripState";

// icons
import dayIcon from "../../assets/icons/day-icon.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import acceptIcon from "../../assets/icons/check.svg";
import finishIcon from "../../assets/icons/finish-icon.svg";

function DayView({ dayNumber, date, eventsProp, onDeleteEvent }) {
  const [events, setEvents] = useState(eventsProp);
  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);
    console.log('events',events)
    console.log('tripInfo',tripInfo)
  // Local state for day's events
  const [dayEvents, setDayEvents] = useState(eventsProp);

  // Global Recoil state for the trip
  const [viewTripDetails, setViewTripDetails] = useRecoilState(viewTripState);
  const [updatedTrip, setUpdatedTrip] = useRecoilState(updatedTripState);
      
  // Initialize updatedTripState with viewTripState data when the component mounts
  useEffect(() => {
    if (viewTripDetails) {
      setUpdatedTrip(viewTripDetails);
    }
  }, [viewTripDetails, setUpdatedTrip]);

  // This function adds an event to the day's events
  const addEventToDay = (eventData) => {
    const newEvent = {
      date: date,
      event_time: eventData.time || "00:00",
      event_type: eventData.type,
      event_description: eventData.title
    };

    // Update state
    setEvents(prevEvents => [...prevEvents, newEvent]);

    // Update global state
    setUpdatedTrip(prevTrip => {
        const existingEvents = Array.isArray(prevTrip.events) ? prevTrip.events : [];
        const updatedEvents = [...existingEvents, newEvent];
        return { ...prevTrip, events: updatedEvents };
      });
  };

  const onDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const [title, type] = data.split(",");
    console.log("title:", title, "type:", type);
    console.log("data:", data)
    addEventToDay({ title, type });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTimeChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleEnterEvent = (e, index) => {
    if (e.key === "Enter") {
      const updatedEvents = [...events];
      updatedEvents[index].event_description = inputValue;
      setEvents(updatedEvents);
      setInputIndex(null);
      setInputValue("");
    }
  };

  const handleEnterTime = (e, index) => {
    if (e.key === "Enter") {
      const updatedEvents = [...events];
      updatedEvents[index].time = formatTime(inputTime);
      setEvents(updatedEvents);
      setInputIndex(null);
    }
  };

  const handleUpdateEventAndTime = (index) => {
    const updatedEvent = {
        ...events[index],
        event_description: inputValue,
        event_time: inputTime.includes("AM") || inputTime.includes("PM") ? inputTime : formatTime(inputTime),
    };

    const updatedEvents = [
      ...events.slice(0, index),
      updatedEvent,
      ...events.slice(index + 1),
    ];

    console.log("updatedEvents", updatedEvents);

    setEvents(updatedEvents);

    const eventsArray = Object.keys(tripInfo.events).reduce((acc, date) => {
        const eventsForDate = tripInfo.events[date].map(event => ({
            ...event,
            date: date
        }));
        return acc.concat(eventsForDate);
    }, []);

    setUpdatedTrip(prevTrip => ({
        ...prevTrip,
        events: eventsArray,
    }));

    setInputIndex(null);
    setInputValue("");
  };
    
    // Helper function to format time
  const formatTime = (time) => {
    if (!time) {
      return "";
    }
  
    // Check if time includes AM/PM. If so, return as is.
    if (time.includes("AM") || time.includes("PM")) {
      return time;
    }
  
    // Assuming time is in 24-hour format HH:MM
    const [hours, minutes] = time.split(":").map(Number);
  
    // Format hours and AM/PM based on 24-hour time
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // Helper function to convert time input to 24 hour time
  const convertTo24Hour = (time) => {
    if (!time) {
        return ""; // return an empty string or a default value
      }
    
    if (!time.includes("AM") && !time.includes("PM")) {
      // Time is already in 24-hour format
      return time;
    }

    let [hours, minutes] = time.split(":")[0].padStart(2, "0");
    const period = time.includes("PM") ? "PM" : "AM";

    if (period === "PM" && hours !== "12") {
      hours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  };

  const handleDeleteClick = (index) => {
    const eventToBeDeleted = events[index];
    console.log("Event to be deleted:", eventToBeDeleted);
    onDeleteEvent(eventToBeDeleted);
  };

  // Updates tripInfo everytime a Day state changes
  useEffect(() => {
    // Only update tripInfo if the events for this date have changed
    if (JSON.stringify(tripInfo.events[date]) !== JSON.stringify(events)) {
      setTripInfo((prevTripInfo) => ({
        ...prevTripInfo,
        events: {
          ...prevTripInfo.events,
          [date]: events,
        },
      }));
    }
  }, [events, setTripInfo, date, tripInfo.events]);

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
        <div className="day--entry" key={event.id || index}>
          {inputIndex === index ? (
            <div className="day--entry--container">
              <div>
                <p className="day--entry--container__event">{event.event_description}</p>
                <p className="day--entry--container__time">
                  {event.event_time && convertTo24Hour(event.event_time)}
                </p>
              </div>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleEnterEvent(e, index)}
                  autoFocus
                />
                <input
                  type="time"
                  value={inputTime}
                  onChange={handleTimeChange}
                  onKeyDown={(e) => handleEnterTime(e, index)}
                />
                <img
                  className="day--entry--container__accept"
                  src={acceptIcon}
                  onClick={() => handleUpdateEventAndTime(index)}
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="day--entry--container">
              <p className="day--entry--container__event">{event.event_description}</p>
              <p className="day--entry--container__time">
                {event.event_time && formatTime(event.event_time)}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].event_description);
                  setInputTime(convertTo24Hour(events[index].event_time));
                }}
                alt="Edit icon"
              />
              <img
                className="day--entry--container__icon"
                src={deleteIcon}
                onClick={() => handleDeleteClick(index)}
                alt="Delete icon"
              />
            </div>
          )}
        </div>
      ))}
      <div
        className="day--area"
        onDragOver={(e) => {
          e.preventDefault(); // This is necessary to allow a drop
        }}
        onDrop={onDrop}>
        <p>Drag Here</p>
      </div>
      <div className="day--line">
        <img src={finishIcon} alt="Icon description" className="day--finish-icon" />
      </div>
    </div>
  );
}

export default DayView;
