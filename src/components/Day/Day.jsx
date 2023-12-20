import "./Day.scss";
import { useState, useEffect } from "react";

// utils
import { to12HourFormat } from '../../utils/convertHourUtils';

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

function Day({ dayNumber, date }) {
  const [events, setEvents] = useState([]);
  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isModalOpen, setModalOpen] = useRecoilState(dayViewModalState);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

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
      const formattedTime = to12HourFormat(inputTime);
      const updatedEvents = [...events];
      updatedEvents[index].time = formattedTime;
      setEvents(updatedEvents);
      setInputIndex(null);
    }
  };

  const handleUpdateEventAndTime = (index) => {
    const formattedTime = to12HourFormat(inputTime); 
    const updatedEvent = {
      ...events[index],
      title: inputValue,
      time: formattedTime,
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

  const handleDeleteClick = (index) => {
    // Additional logic here
    setDeleteEventIndex(index);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedEvents = [...events];
    setEvents(updatedEvents);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Updates tripInfo everytime a Day state changes
  useEffect(() => {
    setTripInfo((prevTripInfo) => ({
      ...prevTripInfo,
      events: {
        ...prevTripInfo.events,
        [date]: events,
      },
    }));
  }, [events, setTripInfo, date]);

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
                <p className="day--entry--container__event">{event.title}</p>
                <p className="day--entry--container__time">
                  {event.time}
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
              <p className="day--entry--container__event">{event.title}</p>
              <p className="day--entry--container__time">
                {event.time}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].title);
                  const formattedTime = event.time ? to12HourFormat(event.time) : "";
                  setInputTime(formattedTime);
                }}
                alt="Edit icon"
              />
              <img
                className="day--entry--container__icon"
                src={deleteIcon}
                onClick={() => handleDeleteClick(index)}
                alt="Delete icon"
              />
              {isModalOpen && (
                <Modal
                  isOpen={isModalOpen}
                  textContent={`Are you sure you want to delete the event "${events[deleteEventIndex]?.title}"?`}
                  buttonText="Delete"
                  onButtonClick={handleDeleteConfirm}
                  onCloseClick={handleCloseModal}></Modal>
              )}
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
    </div>
  );
}

export default Day;
