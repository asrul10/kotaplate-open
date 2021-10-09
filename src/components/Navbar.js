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

const components = [
  {
    href: "/",
    label: "Buttons",
  },
  {
    href: "/",
    label: "Button group",
  },
  {
    href: "/",
    label: "Icons",
  },
  {
    href: "/",
    label: "Typography",
  },
  {
    href: "/",
    label: "Breadcrumb",
  },
  {
    href: "/",
    label: "Dropdowns",
  },
  {
    href: "/",
    label: "Pagination",
  },
  {
    href: "/",
    label: "Steps",
  },
  {
    href: "/",
    label: "Auto Complete",
  },
  {
    href: "/",
    label: "Checkbox",
  },
  {
    href: "/",
    label: "Date Picker",
  },
  {
    href: "/",
    label: "Forms",
  },
  {
    href: "/",
    label: "Input Number",
  },
  {
    href: "/",
    label: "Input",
  },
  {
    href: "/",
    label: "Mentions",
  },
  {
    href: "/",
    label: "Radio",
  },
  {
    href: "/",
    label: "Switch",
  },
  {
    href: "/",
    label: "Slider",
  },
  {
    href: "/",
    label: "Select",
  },
  {
    href: "/",
    label: "Transfer",
  },
  {
    href: "/",
    label: "Time Picker",
  },
  {
    href: "/",
    label: "Upload",
  },
  {
    href: "/",
    label: "Badge",
  },
  {
    href: "/",
    label: "Card",
  },
  {
    href: "/",
    label: "Carousel",
  },
  {
    href: "/",
    label: "Collapse",
  },
  {
    href: "/",
    label: "Navs",
  },
  {
    href: "/",
    label: "Popovers",
  },
  {
    href: "/",
    label: "Tooltips",
  },
  {
    href: "/",
    label: "List group",
  },
  {
    href: "/",
    label: "Avatar",
  },
  {
    href: "/",
    label: "Comment",
  },
  {
    href: "/",
    label: "Calendar",
  },
  {
    href: "/",
    label: "Tree",
  },
  {
    href: "/",
    label: "Timeline",
  },
  {
    href: "/",
    label: "Tables",
  },
  {
    href: "/",
    label: "Alerts",
  },
  {
    href: "/",
    label: "Modal",
  },
  {
    href: "/",
    label: "Progress",
  },
  {
    href: "/",
    label: "Message",
  },
  {
    href: "/",
    label: "Notification",
  },
  {
    href: "/",
    label: "Skeleton",
  },
  {
    href: "/",
    label: "Jumbotron",
  },
  {
    href: "/",
    label: "Media Object",
  },
  {
    href: "/",
    label: "Scrollspy",
  },
  {
    href: "/",
    label: "Apex",
  },
  {
    href: "/",
    label: "Chartjs",
  },
  {
    href: "/",
    label: "Google Maps",
  },
  {
    href: "/",
    label: "Open Street Maps",
  },
];

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
