import { faChevronRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import stringToIcon from "../../utility/stringToIcon";

const NavItem = ({ nav }) => {
  const [loadIcon, setLoadIcon] = useState(
    typeof nav.icon === "object" ? nav.icon : faChevronRight
  );

  if (nav.icon && typeof nav.icon === "string") {
    stringToIcon(nav.icon).then((icon) => setLoadIcon(icon));
  }

  if (nav.current) {
    return (
      <li className="breadcrumb-item active" aria-current="page">
        <FontAwesomeIcon icon={loadIcon} className="breadcrumb-arrow" />{" "}
        {nav.label}
      </li>
    );
  }
  return (
    <li className="breadcrumb-item">
      <FontAwesomeIcon icon={loadIcon} className="breadcrumb-arrow" />{" "}
      <a href={nav.href}>{nav.label}</a>
    </li>
  );
};

const KotaBreadcrumb = ({ navItems, home }) => {
  if (!home) {
    home = {
      href: "/",
      icon: faHome,
      label: "Home",
    };
  }
  const [homeIcon, setHomeIcon] = useState(home.icon);
  if (home.icon && typeof home.icon === "string") {
    stringToIcon(home.icon).then((icon) => setHomeIcon(icon));
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href={home.href}>
            <FontAwesomeIcon icon={homeIcon} className="breadcrumb-icon" />{" "}
            {home.label}
          </a>
        </li>
        {navItems &&
          navItems.map((value, index) => <NavItem nav={value} key={index} />)}
      </ol>
    </nav>
  );
};

export default KotaBreadcrumb;
