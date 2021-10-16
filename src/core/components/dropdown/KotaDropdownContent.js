import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const KotaDropdownContent = (props) => {
  const { items } = props;

  return (
    <div className="dropdown-menu dropdown-menu-end">
      {items.map((item, index) => {
        if (item.onClick) {
          return (
            <button
              className="dropdown-item btn btn-anchor text-dark"
              key={index}
              onClick={item.onClick}
            >
              {item.icon && (
                <FontAwesomeIcon
                  icon={item.icon}
                  className={item.label ? "fas me-1" : "fas"}
                />
              )}
              {item.label}
            </button>
          );
        }
        if (!item.externalLink) {
          return (
            <Link className="dropdown-item" to={item.href} key={index}>
              {item.icon && (
                <FontAwesomeIcon
                  icon={item.icon}
                  className={item.label ? "fas me-1" : "fas"}
                />
              )}
              {item.label}
            </Link>
          );
        }
        return (
          <a className="dropdown-item" href={item.href} key={index}>
            {item.icon && (
              <FontAwesomeIcon
                icon={item.icon}
                className={item.label ? "fas me-1" : "fas"}
              />
            )}
            {item.label}
          </a>
        );
      })}
    </div>
  );
};

export default KotaDropdownContent;
