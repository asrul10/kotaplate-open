import KotaContent from "../core/components/content/KotaContent";
import KotaFooter from "../core/components/footer/KotaFooter";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="main">
      <Navbar />
      <div className="page-wrapper">
        <Sidebar />
        <KotaContent>
          {children}
          <KotaFooter />
        </KotaContent>
      </div>
    </div>
  );
};

export default AdminLayout;
