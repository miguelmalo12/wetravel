import "./Day.scss";
import { useState, useEffect } from "react";
import { parse, format, parseISO, isValid } from 'date-fns';

// utils
import { to12HourFormat } from '../../utils/convertHourUtils';
import { to24HourFormat } from '../../utils/convertHourUtils';
import { sortEventsByTime } from '../../utils/sortEventsUtils';

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
import moveIcon from "../../assets/icons/move.svg";
import finishIcon from "../../assets/icons/finish-icon.svg";

function Day({ dayNumber, date, setActiveItem, touchedData, setTouchedData, onMoveEvent, availableDates }) {
  const isPhablet = window.innerWidth < 810;

  const [events, setEvents] = useState([]);
  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isModalOpen, setModalOpen] = useRecoilState(dayViewModalState);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [, setTripInfo] = useRecoilState(tripInfoState);

  const [showMoveDropdown, setShowMoveDropdown] = useState(null);
  const [selectedNewDay, setSelectedNewDay] = useState("");

  const parseCustomDate = (dateStr) => {
    const currentYear = new Date().getFullYear();
    // Assuming dateStr is something like "Thu, 18 Apr", we remove the day of the week.
    const cleanDateStr = dateStr.replace(/^[a-zA-Z]{3}, /, '');
    const fullDateStr = `${cleanDateStr} ${currentYear}`;
    return parse(fullDateStr, 'dd MMM yyyy', new Date());
  };

  const parsedDate = parseCustomDate(date);
  const formattedDate = format(parsedDate, 'yyyy-MM-dd');

  const filteredAvailableDates = availableDates.filter(d => d !== formattedDate);

  const addEventToDay = (eventData) => {
    eventData.time = to12HourFormat(eventData.time || "00:00");
    setEvents(prevEvents => {
      const updatedEvents = sortEventsByTime([...prevEvents, eventData]);
      // Update Recoil state right after updating local state
      setTripInfo(prevTripInfo => {
        const updatedGlobalEvents = { ...prevTripInfo.events };
        updatedGlobalEvents[formattedDate] = updatedEvents;
        return {
          ...prevTripInfo,
          events: updatedGlobalEvents
        };
      });
      return updatedEvents;
    });
    setActiveItem(null);
    setTouchedData(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const [title, type] = data.split(",");
    const newEvent = { title, time: "00:00", type, id: Date.now() };
    addEventToDay(newEvent);
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

    let updatedEvents = [
      ...events.slice(0, index),
      updatedEvent,
      ...events.slice(index + 1),
    ];

    updatedEvents = sortEventsByTime(updatedEvents);
    setEvents(updatedEvents);
    setInputIndex(null);
    setInputValue("");
  };

  const handleDeleteClick = (index) => {
    setDeleteEventIndex(index);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedEvents = events.filter((_, index) => index !== deleteEventIndex);
    setEvents(updatedEvents);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectNewDay = (newDate, eventIndex) => {
    if (newDate && events[eventIndex]) {
      const eventData = events[eventIndex];
      // Parse the 'date' from the format 'Tue, 23 Apr' assuming it's for the current year
      const currentDate = parse(date, 'E, dd MMM', new Date(), { awareOfUnicodeTokens: true });
      const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd'); // Format it to 'YYYY-MM-DD'
  
      console.log('eventData', eventData);
      onMoveEvent(eventData, formattedCurrentDate, newDate);  // Pass the formatted current date
      setShowMoveDropdown(-1);
      setSelectedNewDay("");
    } else {
      console.error('Error: newDate or event data is missing.');
    }
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

  useEffect(() => {
    console.log(`Events for ${date}:`, events);
  }, [events, date]);

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
                <p className="day--entry--container__event" data-event-type={event.type}>{event.title}</p>
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
              <p className="day--entry--container__event" data-event-type={event.type}>{event.title}</p>
              <p className="day--entry--container__time">
                {event.time}
              </p>
              <img
                className="day--entry--container__icon"
                src={editIcon}
                onClick={() => {
                  setInputIndex(index);
                  setInputValue(events[index].title);
                  const formattedTime = event.time ? to24HourFormat(event.time) : "";
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
              <img
                className="day--entry--container__icon"
                src={moveIcon}
                alt="Move icon"
                onClick={() => setShowMoveDropdown(index === showMoveDropdown ? null : index)}
              />
              {showMoveDropdown === index && (
                <select
                  value={selectedNewDay}
                  onChange={(e) => handleSelectNewDay(e.target.value, index)}
                  onBlur={() => setShowMoveDropdown(null)}
                >
                  <option value="">Move event to:</option>
                  {filteredAvailableDates.map(d => (
                    <option key={d} value={d}>
                      {format(parseISO(d), 'EEE, dd MMM')}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      ))}
      <div
        className="day--area"
        onTouchEnd={() => {
          if (touchedData) {
            addEventToDay({ ...touchedData, id: Date.now() });
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

export default Day;
