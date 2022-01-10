
import KotaFooter from "../core/components/footer/KotaFooter";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useResizeDetector } from "react-resize-detector";
import PerfectScrollbar from 'perfect-scrollbar';

const AdminLayout = ({ children }) => {
  const [perfectScroll, setPerfectScroll] = useState(null);
  const contentWrapper = useRef();
  const location = useLocation();
  const onResize = useCallback(() => {
    if (perfectScroll) {
      perfectScroll.update();
    }
  }, [perfectScroll]);
  const { ref } = useResizeDetector({ onResize });

  useEffect(() => {
    setPerfectScroll(
      new PerfectScrollbar(contentWrapper.current, {
        wheelSpeed: 0.5,
      })
    );
  }, [contentWrapper]);

  useEffect(() => {
    contentWrapper.current.scrollTop = 0;
  }, [location]);

  return (
    <div className="main">
      <Navbar />
      <div className="page-wrapper">
        <Sidebar />
        <div ref={contentWrapper} className="content-wrapper">
          <div ref={ref} className="main-content">
            {children}
            <KotaFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
