import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  const apiUrl =
    type === "student"
      ? "/students/total"
      : type === "book"
      ? "/books/total"
      : type === "students"
      ? "/students/withbooks"
      : type === "available"
      ? "/books/total/available"
      : null;

  const statsUrl =
    type === "student"
      ? "/students/stats"
      : type === "book"
      ? "/books/stats"
      : type === "students"
      ? "/students/withbooks"
      : type === "available"
      ? "/books/total/available"
      : null;

  const { data: apiData, loading, error } = useFetch(apiUrl);
  const { data: statsData, loading: statsLoading, error: statsError } = useFetch(statsUrl);

  const percentChange = statsData?.percentChange || 0;
  const isPositive = percentChange >= 0;

  // Extract the specific value from the API response
  const totalValue = apiData?.totalStudents || apiData?.totalBooks || apiData?.totalBookings || apiData?.totalAvailable || apiData?.totalStudentsWithBooks || 0;

  switch (type) {
    case "student":
      data = {
        title: "STUDENTS",
        isMoney: false,
        link: (
          <Link to="/students" style={{ textDecoration: "none", color: "blue" }}>
            See all students
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "book":
      data = {
        title: "BOOKS",
        isMoney: false,
        link: (
          <Link to="/books" style={{ textDecoration: "none", color: "blue" }}>
            See all books
          </Link>
        ),
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "students":
      data = {
        title: "Students with Books",
        isMoney: false,
        link: (
          <Link to="/students" style={{ textDecoration: "none", color: "blue" }}>
            View all students
          </Link>
        ),
        icon: (
          <ApartmentOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "available":
      data = {
        title: "AVAILABLE BOOKS",
        isMoney: false,
        link: (
          <Link to="/books" style={{ textDecoration: "none", color: "blue" }}>
            View all books
          </Link>
        ),
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      return null;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {loading ? "Loading..." : error ? "Error" : totalValue}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${isPositive ? "positive" : "negative"}`}>
          {isPositive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {statsLoading ? "..." : statsError ? "N/A" : `${Math.abs(percentChange)}%`}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;