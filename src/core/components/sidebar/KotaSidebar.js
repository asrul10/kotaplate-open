import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import stringToIcon from "../../utility/stringToIcon";
import { Link, useLocation } from "react-router-dom";
import isMatchLocation from "../../utility/isMatchLocation";

const Anchor = ({ menu, icon, badge }) => {
  if (menu.externalLink) {
    return (
      <a href={menu.href}>
        {icon && <FontAwesomeIcon icon={icon} className="fas" />}
        {menu.label} {badge}
      </a>
    );
  }
  return (
    <Link to={menu.href}>
      {icon && <FontAwesomeIcon icon={icon} className="fas" />}
      {menu.label} {badge}
    </Link>
  );
};

const ChildLink = ({ menu }) => {
  return (
    <li className={menu.active ? "active" : ""}>
      <Anchor menu={menu} />
    </li>
  );
};

const ChildMenu = ({ child }) => {
  return (
    <ul className="menu-sub">
      {child.map((value, index) => (
        <ChildLink menu={value} key={index} />
      ))}
    </ul>
  );
};

const MenuItem = ({ menu, perfectScroll }) => {
  const [toggleDropdown, setToggleDropdown] = useState(menu.active);
  const [loadIcon, setLoadIcon] = useState(
    typeof menu.icon === "object" ? menu.icon : faCircle
  );
  const badge = menu.badge && (
    <span className={`badge bg-${menu.badge.colorTheme} label-right`}>
      {menu.badge.label}
    </span>
  );

  const dropdownClass = () => {
    let dropdownClass = "";
    if (toggleDropdown) {
      dropdownClass = "open";
    }
    if (menu.active) {
      dropdownClass += " active";
    }
    return dropdownClass;
  };

  useEffect(() => {
    if (menu.active) {
      setToggleDropdown(true);
    }
  }, [menu.active]);

  useEffect(() => {
    perfectScroll && perfectScroll.update();
  }, [toggleDropdown, perfectScroll]);

  if (menu.icon && typeof menu.icon === "string") {
    stringToIcon(menu.icon).then((icon) => setLoadIcon(icon));
  }

  if (!menu.href && !menu.child) {
    return (
      <li className="menu-link menu-heading">
        <span>{menu.label}</span>
      </li>
    );
  }

  if (menu.child) {
    return (
      <li className={`menu-link dropdown ${dropdownClass()}`}>
        <button
          type="button"
          className="btn btn-anchor"
          onClick={() => setToggleDropdown(!toggleDropdown)}
        >
          <FontAwesomeIcon icon={loadIcon} className="fas" />
          {menu.label} {badge}
          <FontAwesomeIcon
            icon={toggleDropdown ? faChevronUp : faChevronDown}
            className="menu-link-arrow"
          />
        </button>
        <ChildMenu child={menu.child} />
      </li>
    );
  }

  return (
    <li className={`menu-link ${menu.active ? "active" : ""}`}>
      <Anchor menu={menu} icon={loadIcon} badge={badge} />
    </li>
  );
};

const KotaSidebar = ({ menuItems, autoActiveMenu }) => {
  const [perfectScroll, setPerfectScroll] = useState(null);
  const sidebarWrapper = useRef();
  const location = useLocation();
  const { pathname } = location;

  const setActiveMenu = (menu) => {
    menu.active = false;

    if (menu.child) {
      for (let index = 0; index < menu.child.length; index++) {
        const menuChild = menu.child[index];
        setActiveMenu(menuChild);
        if (menuChild.active) {
          menu.active = true;
        }
      }
    }

    if (menu.href && isMatchLocation(menu.href, pathname)) {
      menu.active = true;
    }
  };

  const menuList = () => {
    if (!autoActiveMenu) {
      return menuItems;
    }
    for (let index = 0; index < menuItems.length; index++) {
      const menu = menuItems[index];
      setActiveMenu(menu);
    }
    return menuItems;
  };

  useEffect(() => {
    setPerfectScroll(
      new PerfectScrollbar(sidebarWrapper.current, {
        wheelSpeed: 0.5,
      })
    );
  }, [sidebarWrapper]);

  return (
    <nav ref={sidebarWrapper} className={`sidebar-wrapper no-print`}>
      <ul className="sidebar-menu">
        {menuList().map((menu, index) => (
          <MenuItem menu={menu} perfectScroll={perfectScroll} key={index} />
        ))}
      </ul>
    </nav>
  );
};

export default KotaSidebar;
