import "./Day.scss";
import { useState, useEffect } from "react";
import { format, parseISO } from 'date-fns';

// utils
import { to12HourFormat } from '../../utils/convertHourUtils';
import { to24HourFormat } from '../../utils/convertHourUtils';

// recoil state
import { useRecoilState, useSetRecoilState } from "recoil";
import { tripInfoState } from "../../state/tripState";
import { viewTripState } from "../../state/viewTripState";

// icons
import dayIcon from "../../assets/icons/day-icon.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import acceptIcon from "../../assets/icons/check.svg";
import finishIcon from "../../assets/icons/finish-icon.svg";

// Helper Function to sort events by time
const sortEventsByTime = (events) => {
  return events.sort((a, b) => {
    const timeA = to24HourFormat(a.event_time);
    const timeB = to24HourFormat(b.event_time);
    return timeA.localeCompare(timeB);
  });
};

function DayView({ dayNumber, date, eventsProp, onDeleteEvent, setActiveItem, touchedData, setTouchedData }) {
  const isPhablet = window.innerWidth < 810;
  // Initialize events state sorted by time
  const [events, setEvents] = useState(sortEventsByTime(eventsProp.map(event => ({
    ...event,
    tempDescription: event.event_description, // Temporary description
    tempTime: event.event_time // Temporary time
  }))));
  const formattedDate = format(parseISO(date), 'EEE, dd MMM');
  const [inputIndex, setInputIndex] = useState(null);
  const [, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

  // Global Recoil state for the trip
  const setViewTripDetails = useSetRecoilState(viewTripState);

  const handleDrop = (title, type) => {
    if (touchedData) {
      addEventToDay({ title: touchedData.title, type: touchedData.type });
      setTouchedData(null);
    }
  };

  // This function adds an event to the day's events
  const addEventToDay = (eventData) => {
    const tempId = `${Date.now()}-${Math.random().toString(16).slice(2)}`; // Unique temporary ID to be filtered by the PUT request
    const newEvent = {
        tempId,
        date: date,
        event_time: eventData.time || "00:00",
        event_type: eventData.type,
        event_description: eventData.title,
        tempDescription: eventData.title, // Temporary description
        tempTime: "00:00" // Temporary time
    };

    // Update local state
    setEvents(prevEvents => sortEventsByTime([...prevEvents, newEvent]));

    // Update global state
    setViewTripDetails(prevTripDetails => {
        const existingEvents = Array.isArray(prevTripDetails.events) ? prevTripDetails.events : [];
        const updatedEvents = [...existingEvents, newEvent];
        return { ...prevTripDetails, events: updatedEvents };
    });
    setActiveItem(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const [title, type] = data.split(",");
    handleDrop(title, type);
    addEventToDay({ title, type });
  };

  // Function to handle description input change
  const handleInputChange = (e, index) => {
    const updatedEvents = events.map((event, idx) => 
      idx === index ? { ...event, tempDescription: e.target.value } : event
    );
    setEvents(updatedEvents);
  };
  
  // Function to handle time input change
  const handleTimeChange = (e, index) => {
    const updatedEvents = events.map((event, idx) => 
      idx === index ? { ...event, tempTime: e.target.value } : event
    );
    setEvents(updatedEvents);
  };

  const handleEnterEvent = (e, index) => {
    if (e.key === "Enter") {
        const updatedEvent = {
          ...events[index],
          event_description: e.target.value
        };
    
        const updatedEvents = [
          ...events.slice(0, index),
          updatedEvent,
          ...events.slice(index + 1)
        ];
    
        setEvents(updatedEvents);
        setInputIndex(null);
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
        event_description: events[index].tempDescription,
        event_time: to12HourFormat(events[index].tempTime),
    };

    const updatedDayEvents = [
      ...events.slice(0, index),
      updatedEvent,
      ...events.slice(index + 1),
    ];

    setEvents(updatedDayEvents);

    setViewTripDetails(prevDetails => {
      const updatedGlobalEvents = prevDetails.events.map(event => {
        // Update the event if it's the same one being edited
        if ((event.tempId && event.tempId === updatedEvent.tempId) || 
            (event.event_id && event.event_id === updatedEvent.event_id)) {
          return updatedEvent;
        }
        return event;
      });

      return {
        ...prevDetails,
        events: updatedGlobalEvents,
      };
    });

    setInputIndex(null);
    setInputValue("");
  };

  const handleDeleteClick = (index) => {
    const eventToBeDeleted = events[index];
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
          <p>{formattedDate}</p>
        </div>
      </div>
      {events.map((event, index) => (
        <div className="day--entry" key={event.id || index}>
          {inputIndex === index ? (
            <div className="day--entry--container">
              <div>
                <p className="day--entry--container__event" data-event-type={event.event_type}>{event.event_description}</p>
                <p className="day--entry--container__time">
                  {event.event_time && to12HourFormat(event.event_time)}
                </p>
              </div>
              <div>
                <input
                  type="text"
                  value={events[index].tempDescription}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleEnterEvent(e, index)}
                  autoFocus
                />
                <input
                  type="time"
                  value={inputTime}
                  onChange={(e) => handleTimeChange(e, index)}
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
              <p className="day--entry--container__event" data-event-type={event.event_type}>{event.event_description}</p>
              <p className="day--entry--container__time">
                {event.event_time && to12HourFormat(event.event_time)}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].event_description);
                  const formatted24HourTime = to24HourFormat(events[index].event_time);
                  setInputTime(formatted24HourTime);
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
        onTouchEnd={(e) => {
          if (touchedData) {
            addEventToDay(touchedData);
            setTouchedData(null);
          }
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <p>{isPhablet ? "Tap Icon, Then Here" : "Drag Here"}</p>
      </div>
      <div className="day--line">
        <img src={finishIcon} alt="Icon description" className="day--finish-icon" />
      </div>
    </div>
  );
}

export default DayView;
  