import "./Day.scss";
import { useState, useEffect } from "react";
import axios from "axios";

// recoil state
import { useRecoilState } from "recoil";
import { dayViewModalState } from "../../state/modalState";
import { tripInfoState } from "../../state/tripState";

//components
import Modal from "../Modal/Modal";

// icons
import dayIcon from "../../assets/icons/day-icon.svg";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import acceptIcon from "../../assets/icons/check.svg";
import finishIcon from "../../assets/icons/finish-icon.svg";

const API_URL = process.env.REACT_APP_BACKEND_URL;

function DayView({ dayNumber, date, eventsProp }) {
  const [events, setEvents] = useState(eventsProp);
  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isModalOpen, setModalOpen] = useRecoilState(dayViewModalState);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

  console.log(`Events for Day ${dayNumber} (${date}):`, eventsProp);

  // This keeps the events state in sync with the eventsProp
  useEffect(() => {
    setEvents(eventsProp);
  }, [eventsProp]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTimeChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleEnterEvent = (e, index) => {
    if (e.key === "Enter") {
      const updatedEvents = [...events];
      updatedEvents[index].title = inputValue;
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
      title: inputValue,
      time:
        inputTime.includes("AM") || inputTime.includes("PM")
          ? inputTime
          : formatTime(inputTime),
    };

    const updatedEvents = [
      ...events.slice(0, index),
      updatedEvent,
      ...events.slice(index + 1),
    ];

    setEvents(updatedEvents);
    setInputIndex(null);
    setInputValue("");
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let formattedTime = "";
    let period = "AM";

    if (parseInt(hours, 10) === 0) {
      formattedTime = `12:${minutes}`;
    } else if (parseInt(hours, 10) < 12) {
      formattedTime = `${parseInt(hours, 10)}:${minutes}`;
    } else if (parseInt(hours, 10) === 12) {
      formattedTime = `12:${minutes}`;
      period = "PM";
    } else {
      formattedTime = `${parseInt(hours, 10) - 12}:${minutes}`;
      period = "PM";
    }

    return `${formattedTime} ${period}`;
  };

  // Function to convert time input to 24 hour time
  const convertTo24Hour = (time) => {
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
    const event = events[index];
    setEventToDelete(event);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async (eventToDelete) => {

    if (!eventToDelete) {
      console.error("Event ID not found");
      return;
    }
  
    try {
      await axios.delete(`${API_URL}/${tripInfo.trip_id}/event/${eventToDelete.event_id}`);
      console.log("Event deleted successfully");
  
      // Remove the event from local state using filter and event_id
      const updatedEvents = events.filter(event => event.event_id !== eventToDelete.event_id);
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  
    setModalOpen(false);
    setEventToDelete(null);
  };  

  const handleCloseModal = () => {
    setModalOpen(false);
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
        <div className="day--entry" key={index}>
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
                {event.event_time && convertTo24Hour(event.event_time)}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].title);
                  setInputTime(convertTo24Hour(events[index].time));
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
        onDrop={(e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData("text/plain");
          const [eventTitle, eventType] = data.split(",");
          // const eventTime = "00:00 AM";
          setEvents([...events, { title: eventTitle, time: "", type: eventType }]);
        }}>
        <p>Drag Here</p>
      </div>
      <div className="day--line">
        <img src={finishIcon} alt="Icon description" className="day--finish-icon" />
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          textContent={`Are you sure you want to delete the event "${eventToDelete?.title}"?`}
          buttonText="Delete"
          onButtonClick={() => handleDeleteConfirm(eventToDelete)}
          onCloseClick={() => {
            setModalOpen(false);
            setEventToDelete(null); // Reset the eventToDelete state when closing the modal
          }}>
        </Modal>
      )}
    </div>
  );
}

export default DayView;
