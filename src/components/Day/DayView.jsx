import "./Day.scss";
import { useState, useEffect } from "react";

// utils
import { to12HourFormat } from '../../utils/convertHourUtils';

// recoil state
import { useRecoilState } from "recoil";
import { dayViewModalState } from "../../state/modalState";
import { tripInfoState } from "../../state/tripState";
import { viewTripState } from "../../state/viewTripState";

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

  // Global Recoil state for the trip
  const [viewTripDetails, setViewTripDetails] = useRecoilState(viewTripState);

  // This function adds an event to the day's events
  const addEventToDay = (eventData) => {
    const newEvent = {
      date: date,
      event_time: eventData.time || "00:00",
      event_type: eventData.type,
      event_description: eventData.title
    };

    // Update local state
    setEvents(prevEvents => [...prevEvents, newEvent]);

    // Update global state
    setViewTripDetails(prevTripDetails => {
        const existingEvents = Array.isArray(prevTripDetails.events) ? prevTripDetails.events : [];
        const updatedEvents = [...existingEvents, newEvent];
        return { ...prevTripDetails, events: updatedEvents };
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
      updatedEvents[index].time = to12HourFormat(inputTime);
      setEvents(updatedEvents);
      setInputIndex(null);
    }
  };

  // Updates an specific event description and/or time
  const handleUpdateEventAndTime = (index) => {
    const updatedEvent = {
        ...events[index],
        event_description: inputValue,
        event_time: to12HourFormat(inputTime),
    };
    console.log("updatedEvent:", updatedEvent);

    const updatedDayEvents = [
      ...events.slice(0, index),
      updatedEvent,
      ...events.slice(index + 1),
    ];

    setEvents(updatedDayEvents);

    setViewTripDetails(prevDetails => {
        const updatedAllEvents = prevDetails.events.map(event => {
            if(event.date === date && event.event_id === updatedEvent.event_id) {
                return updatedEvent;
            }
            return event;
        });

        return {
          ...prevDetails,
          events: updatedAllEvents,
        };
    });

    setInputIndex(null);
    setInputValue("");
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
                  {event.event_time && to12HourFormat(event.event_time)}
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
                {event.event_time && to12HourFormat(event.event_time)}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].event_description);
                  setInputTime(to12HourFormat(events[index].event_time));
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
