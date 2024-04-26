import "./Day.scss";
import { useState, useEffect, useMemo } from "react";
import { parse, format, parseISO } from 'date-fns';

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

  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [isModalOpen, setModalOpen] = useRecoilState(dayViewModalState);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [tripInfo, setTripInfo] = useRecoilState(tripInfoState);

  const parseCustomDate = (dateStr) => {
    const currentYear = new Date().getFullYear();
    const cleanDateStr = dateStr.replace(/^[a-zA-Z]{3}, /, '');
    const fullDateStr = `${cleanDateStr} ${currentYear}`;
    return parse(fullDateStr, 'dd MMM yyyy', new Date());
  };

  const parsedDate = parseCustomDate(date);
  const formattedDate = format(parsedDate, 'yyyy-MM-dd');
  const filteredAvailableDates = availableDates.filter(d => d !== formattedDate);

  const events = useMemo(() => {
    return tripInfo.events[formattedDate] || [];
  }, [tripInfo.events, formattedDate]);

  const [showMoveDropdown, setShowMoveDropdown] = useState(null);
  const [selectedNewDay, setSelectedNewDay] = useState("");

  // To be used everywhere needed to update recoil state
  const handleEventChange = (updatedEvents) => {
    setTripInfo(prevTripInfo => ({
      ...prevTripInfo,
      events: {
        ...prevTripInfo.events,
        [formattedDate]: updatedEvents,
      }
    }));
  };

  const addOrUpdateEvent = (eventData, index = -1) => {
    const newEvents = index >= 0 ? 
      [...events.slice(0, index), eventData, ...events.slice(index + 1)] :
      [...events, eventData];
    handleEventChange(sortEventsByTime(newEvents));
  };

  const addEventToDay = (eventData) => {
    eventData.time = to12HourFormat(eventData.time || "00:00");
    const updatedEvents = sortEventsByTime([...events, eventData]);
    handleEventChange(updatedEvents);
    setActiveItem(null);
    setTouchedData(null);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    const [title, type] = data.split(",");
    const newEvent = { title, time: "00:00", type, id: Date.now() };
    addOrUpdateEvent(newEvent); 
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
      handleEventChange(updatedEvents);
      setInputIndex(null);
      setInputValue("");
    }
  };

  const handleEnterTime = (e, index) => {
    if (e.key === "Enter") {
      const formattedTime = to12HourFormat(inputTime);
      const updatedEvents = [...events];
      updatedEvents[index].time = formattedTime;
      handleEventChange(updatedEvents);
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

    handleEventChange(sortEventsByTime(updatedEvents));
    setInputIndex(null);
    setInputValue("");
  };

  const handleDeleteClick = (index) => {
    setDeleteEventIndex(index);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const updatedEvents = events.filter((_, index) => index !== deleteEventIndex);
    handleEventChange(updatedEvents);
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectNewDay = (newDate, eventIndex) => {
    if (newDate && events[eventIndex]) {
      const eventData = events[eventIndex];
      const currentDate = parse(date, 'E, dd MMM', new Date(), { awareOfUnicodeTokens: true });
      const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
  
      onMoveEvent(eventData, formattedCurrentDate, newDate);
      setShowMoveDropdown(-1);
      setSelectedNewDay("");
    } else {
      console.error('Error: newDate or event data is missing.');
    }
  };

  // Updates tripInfo everytime a Day state changes
  useEffect(() => {
    if (!events.length) {
      // No events to update, skipping setTripInfo
      return;
    }
  
    setTripInfo((prevTripInfo) => {
      const currentEvents = prevTripInfo.events[date] || [];
      if (JSON.stringify(currentEvents) === JSON.stringify(events)) {
        // No changes in events, skipping update
        return prevTripInfo;
      }
  
      return {
        ...prevTripInfo,
        events: {
          ...prevTripInfo.events,
          [date]: events,
        },
      };
    });
  }, [events, date, setTripInfo]);

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
