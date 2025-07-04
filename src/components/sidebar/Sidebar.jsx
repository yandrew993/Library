import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import EventIcon from "@mui/icons-material/Event";
//import StoreIcon from "@mui/icons-material/Store";
import BookIcon from "@mui/icons-material/Book";
// import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useRef } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Helper function to clear cookies
const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { updateUser } = useContext(AuthContext);
  const logoutInProgress = useRef(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (logoutInProgress.current) return;
    logoutInProgress.current = true;

    try {
      await apiRequest.post("/auth/logout");

      if (updateUser) updateUser(null);
      localStorage.clear();
      sessionStorage.clear();
      clearCookies();

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Library System</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/books" style={{ textDecoration: "none" }}>
            <li>
              <BookIcon className="icon" />
              <span>Books</span>
            </li>
          </Link>
          <Link to="/issuebook" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Issue Book</span>
            </li>
          </Link>
          <Link to="/returnbook" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Return Book</span>
            </li>
          </Link>
          <Link to="#" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Student Analytics</span>
            </li>
          </Link>
          <Link to="#" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Books Chart</span>
            </li>
          </Link>
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li> */}
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
  <ExitToAppIcon className="icon" />
  <span>Logout</span>
</li> */}
        </ul>
      </div>
      <div className="bottom">
        {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
        <ul>
          <p className="title">USER</p>
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
