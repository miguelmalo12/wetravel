import "./Day.scss";
import { useState } from "react";
import dayIcon from "../../assets/icons/day-icon.svg";
import editIcon from "../../assets/icons/edit.svg";
import acceptIcon from "../../assets/icons/check.svg";

function Day({ dayNumber, date }) {
  const [events, setEvents] = useState([]);
  const [inputIndex, setInputIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputTime, setInputTime] = useState("");

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
      updatedEvents[index].time = inputTime;
      setEvents(updatedEvents);
      setInputIndex(null);
    }
  };

  // const handleBlur = () => {
  //   setInputIndex(null);
  //   setInputValue("");
  // };

  const handleUpdateEventAndTime = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].title = inputValue;
    updatedEvents[index].time = inputTime;
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
                <p className="day--entry--container__time">{inputTime ? formatTime(inputTime) : "00:00 AM"}</p>
              </div>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e) => handleEnterEvent(e, index)}
                  // onBlur={handleBlur}
                  autoFocus
                />
                <input
                  type="time"
                  value={inputTime}
                  onChange={handleTimeChange}
                  onKeyDown={(e) => handleEnterTime(e, index)}
                  // onBlur={handleBlur}
                />
                <img
                  className="day--entry--container__accept"
                  src={acceptIcon}
                  onClick={() => handleUpdateEventAndTime(index)}
                  alt=""
                />
                {/* <button onClick={() => handleUpdateEventAndTime(index)}>Update</button> */}
              </div>
            </div>
          ) : (
            <div className="day--entry--container">
              <p className="day--entry--container__event">{event.title}</p>
              <p className="day--entry--container__time">{event.time}</p>
              <img
                className="day--entry--container__edit"
                src={editIcon}
                onClick={() => setInputIndex(index)}
                alt=""
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
          const eventTitle = e.dataTransfer.getData("text/plain");
          // const eventTime = "00:00 AM";
          setEvents([...events, { title: eventTitle, time: "" }]);
        }}
      >
        <p>Drag Here</p>
      </div>
      <div className="day--line"></div>
    </div>
  );
}

export default Day;
