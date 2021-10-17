import PerfectScrollbar from "perfect-scrollbar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useResizeDetector } from "react-resize-detector";

const KotaContent = ({ children }) => {
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
    <div ref={contentWrapper} className="content-wrapper">
      <div ref={ref} className="main-content">
        {children}
      </div>
    </div>
  );
};

export default KotaContent;
