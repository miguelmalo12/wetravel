import "./EventItem.scss";

const EventItem = ({ title, type, activeItem, onItemSelect, icon }) => (
    <div
        className={`event-item ${activeItem && activeItem.title === title ? 'active' : ''}`}
        onTouchStart={(e) => onItemSelect({ title, type }, e)}
        draggable="true"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", `${title},${type}`)}
    >
        <img src={icon} alt="" />
        <h5><span className="desktop-text">{title}</span></h5>
    </div>
);

export default EventItem;