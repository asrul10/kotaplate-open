import KotaSidebar from "../core/components/sidebar/KotaSidebar";
import menuItems from "../data/sidebar.json";

const Sidebar = () => (
  <KotaSidebar menuItems={menuItems} autoActiveMenu={true} />
);

export default Sidebar;
