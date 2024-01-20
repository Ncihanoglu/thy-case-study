import React, { useEffect, useRef } from "react";
import style from "./navbar.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTE_PATHS } from "../../utils/Constants";
const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (ref.current) {
      if (location.pathname === ROUTE_PATHS.HOME) {
        document.body.style.background = "#072f48";
        ref.current.style.color = "#efefef";
        const link = document.getElementById("turkishairlines");
        if (link?.style) {
          link.style.color = "#efefef";
        }
      } else {
        document.body.style.background = "#ffffff";
        ref.current.style.color = "#545454";
        const link = document.getElementById("turkishairlines");
        if (link?.style) {
          link.style.color = "#545454";
        }
      }
    }
  }, [location.pathname]);

  return (
    <>
      <nav className={style.navbarContainer} ref={ref}>
        <a
          className={style.hyperlink}
          href="https://www.turkishairlines.com"
          id="turkishairlines"
        >
          turkishairlines.com
        </a>
        <span>
          search <span style={{ fontWeight: "bolder" }}>Flight Challange</span>
        </span>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
