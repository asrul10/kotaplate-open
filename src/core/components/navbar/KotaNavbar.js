import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Tooltip } from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import KotaDropdown from "../dropdown/KotaDropdown";
import KotaDropdownContent from "../dropdown/KotaDropdownContent";
import { useHotkeys } from "react-hotkeys-hook";

const FormatLabel = ({ item }) => {
  return (
    <>
      {item.image && item.image.src && (
        <img
          src={item.image.src}
          className={`me-1 image-menu ${
            item.image.className ? item.image.className : ""
          }`}
          alt={item.image.alt}
        />
      )}
      {item.icon && (
        <FontAwesomeIcon
          icon={item.icon}
          className={item.label ? "fas me-1" : "fas"}
        />
      )}
      {item.label}
    </>
  );
};

const MenuItem = ({ item }) => {
  const menuElement = useRef();
  const classNameColor = item.color ? `text-${item.color}` : "";

  useEffect(() => {
    if (item.type === "link" && item.tooltip) {
      new Tooltip(menuElement.current, {
        placement: "bottom",
        title: item.tooltip,
      });
    }
  }, [item.type, item.tooltip]);

  if (item.type === "link") {
    return (
      <div className="nav-item ms-2">
        {item.onClick ? (
          <button
            ref={menuElement}
            className={`nav-link btn btn-anchor ${classNameColor}`}
            onClick={item.onClick}
          >
            <FormatLabel item={item} />
          </button>
        ) : (
          <a
            ref={menuElement}
            href={item.href}
            className={`nav-link ${classNameColor}`}
          >
            <FormatLabel item={item} />
          </a>
        )}
      </div>
    );
  }

  if (item.type === "dropdown") {
    const dropdownContent = item.dropdownContent || (
      <KotaDropdownContent items={item.dropdown} />
    );
    return (
      <KotaDropdown
        label={<FormatLabel item={item} />}
        dropdownContent={dropdownContent}
        className="nav-item ms-2"
        btnClassName={`nav-link btn btn-anchor ${classNameColor}`}
      />
    );
  }

  return "";
};

const SearchBar = ({ onSearch, searchlabel }) => {
  const [searchClear, setSearchClear] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dropdownSearch, setDropdownSearch] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const searchInput = useRef();

  useHotkeys("ctrl+/", () => {
    console.log(searchInput);
    searchInput.current.focus();
  });

  useEffect(() => {
    setDropdownSearch(new Dropdown(searchInput.current));
  }, [searchInput]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSearchClear(true);
    } else {
      dropdownSearch.hide();
      setSearchClear(false);
    }
    setSearchValue(value);

    const callbackSearch = onSearch(e);
    if (typeof callbackSearch?.then === "function") {
      callbackSearch.then((resp) => {
        if (!resp.length) {
          dropdownSearch.hide();
          setSearchResult([]);
          return;
        }
        setSearchResult(resp);
        dropdownSearch.show();
      });
    } else {
      if (!callbackSearch.length) {
        dropdownSearch.hide();
        setSearchResult([]);
        return;
      }
      setSearchResult(callbackSearch);
      dropdownSearch.show();
    }
  };

  const handleFocus = (e) => {
    const value = e.target.value;
    if (value !== "") {
      dropdownSearch.show();
    }
  };

  const handleBlur = (e) => {
    setTimeout(() => {
      dropdownSearch.hide();
    }, 100);
  };

  const clearSearch = () => {
    setSearchValue("");
    setSearchClear(false);
  };

  return (
    <div className="navbar-block-content">
      <form className="form-inline searchbar">
        <div className="dropdown">
          <input
            ref={searchInput}
            className="form-control search-input"
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={searchlabel}
            autoComplete="off"
            value={searchValue}
          />
          <KotaDropdownContent items={searchResult} />
        </div>
        {searchClear && (
          <button
            type="button"
            className="btn p-0 shadow-none search-clear"
            onClick={clearSearch}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </button>
        )}
        <small className="search-submit font-sm">Ctrl + /</small>
      </form>
    </div>
  );
};

const KotaNavbar = ({ title, srcLogo, menuItems, onSearch, searchlabel }) => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar-wrapper");
    if (!sidebar) {
      return;
    }
    if (sidebar.style.display === "none") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  };

  return (
    <header className="navbar navbar-expand-lg no-print">
      <div className="navbar-block-content">
        <button
          type="button"
          className="btn btn-anchor text-dark burger-menu"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <a className="navbar-brand" href="/">
          <img src={srcLogo} alt={title} />
        </a>
      </div>
      {onSearch && <SearchBar onSearch={onSearch} searchlabel={searchlabel} />}
      <div className="navbar-block-content">
        <div className="navbar-nav">
          {menuItems.map((item, index) => (
            <MenuItem item={item} key={index} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default KotaNavbar;
