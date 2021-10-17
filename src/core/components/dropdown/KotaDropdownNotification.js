import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import stringToIcon from "../../utility/stringToIcon";

const timeSince = (date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

const NotificationIcon = ({ item }) => {
  const [loadIcon, setLoadIcon] = useState(faCircle);

  if (item.icon) {
    stringToIcon(item.icon).then((icon) => setLoadIcon(icon));
    return (
      <FontAwesomeIcon
        icon={loadIcon}
        className={item.label ? "fas me-2" : "fas"}
      />
    );
  }

  return (
    <FontAwesomeIcon
      icon={faCircle}
      className={item.label ? "fas me-2" : "fas"}
    />
  );
};

const KotaDropdownNotification = (props) => {
  const { header, clearAllCallback, items, viewAllCallback } = props;

  return (
    <div
      className="dropdown-menu dropdown-menu-end"
      aria-labelledby="notification"
    >
      <div className="header-notifications align-items-center">
        <strong>{header}</strong>
        <button
          className="btn btn-anchor p-0 text-dark fw-normal"
          onClick={clearAllCallback}
        >
          Clear all
        </button>
      </div>
      <div className="dropdown-divider"></div>
      {items.map((item, index) => (
        <a className="dropdown-item" href={item.href} key={index}>
          <NotificationIcon item={item} />
          {item.label} <strong>{item.highlight}</strong>
          <div className="time-notifications">
            {timeSince(item.dateReceived)} ago
          </div>
        </a>
      ))}
      <div className="dropdown-divider"></div>
      <div className="text-center p-1">
        <button onClick={viewAllCallback} className="btn btn-anchor p-0">
          View all
        </button>
      </div>
    </div>
  );
};

export default KotaDropdownNotification;
