import logo from "../assets/images/kotaplate-full-logo.png";
import KotaDropdownNotification from "../core/components/dropdown/KotaDropdownNotification";
import KotaNavbar from "../core/components/navbar/KotaNavbar";
import usFlag from "../assets/images/usa-50.png";
import profilePic from "../assets/images/portrait.png";
import {
  faBell,
  faCalendar,
  faCog,
  faEdit,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import sidebarMenu from "../data/sidebar.json";

const title = "Kotaplate";

const notifications = [
  {
    href: "#",
    label: "New message from",
    highlight: "pepe",
    dateReceived: "2021-08-14 07:16:00",
  },
  {
    href: "#",
    icon: "check-square",
    label: "Your request has ben",
    highlight: "approved",
    dateReceived: "2021-08-14 06:40:00",
  },
  {
    href: "#",
    icon: "calendar",
    label: "You have meeting with",
    highlight: "engineering",
    dateReceived: "2021-08-14 06:35:00",
  },
];

const menuItems = [
  {
    type: "dropdown",
    image: {
      src: usFlag,
      alt: "Translation",
    },
    label: "EN",
    dropdown: [
      { href: "/", label: "English" },
      { href: "/", label: "Bahasa" },
    ],
  },
  {
    type: "link",
    href: "/",
    icon: faCalendar,
    tooltip: "Calendar",
  },
  {
    type: "link",
    href: "/",
    icon: faEnvelope,
    tooltip: "Mail",
  },
  {
    type: "dropdown",
    href: "/",
    icon: faBell,
    color: "danger",
    dropdownContent: (
      <KotaDropdownNotification
        header="100+ New Notificaions"
        items={notifications}
        viewAllCallback={() => console.log("view all")}
        clearAllCallback={() => console.log("clear all")}
      />
    ),
  },
  {
    type: "dropdown",
    image: {
      src: profilePic,
      alt: "Mawar",
      className: "profile",
    },
    label: "Mawar",
    dropdown: [
      { href: "/", icon: faEdit, label: "Mawar" },
      {
        href: "/",
        icon: faSignOutAlt,
        label: "Logout",
        onClick: () => console.log("logout"),
      },
    ],
  },
  {
    type: "link",
    href: "/",
    icon: faCog,
    tooltip: "Settings",
  },
];

const filterMenu = (menus) => {
  let newList = [];
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (menu.href) {
      newList.push({
        href: menu.href,
        label: menu.label,
      });
    }
    if (menu.child) {
      newList = newList.concat(filterMenu(menu.child));
    }
  }
  return newList;
};

const components = filterMenu(sidebarMenu);

const handleSearchBar = (e) => {
  const word = e.target.value;
  let searchList = components.filter((value) => {
    const label = value.label.toLowerCase().replace(/\s/, "");
    const searchWord = word.toLowerCase().replace(/\s/, "");
    return label.includes(searchWord);
  });
  if (searchList.length > 6) {
    searchList = searchList.slice(0, 5);
  }
  return searchList;
};

const Navbar = () => (
  <KotaNavbar
    menuItems={menuItems}
    onSearch={handleSearchBar}
    searchlabel="Search components"
    srcLogo={logo}
    title={title}
  />
);

export default Navbar;
