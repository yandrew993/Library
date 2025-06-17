import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { bookingColumns, postColumns, userColumns } from "./datatablesource";
import NewHotel from "./components/newHotel/NewHotel";
import SingleHouse from "./pages/singleHouse/SingleHouse";
//import Payment from "./pages/payments/Payment";
import Profile from "./pages/profile/Profile";
import Booking from "./pages/booking/Booking";
import IssueBook from "./components/issueBook/IssueBook";
import ReturnBook from "./components/returnBook/ReturnBook";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // ProtectedRoute component to restrict access to authenticated users
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="students">
                    <Route index element={<List columns={userColumns} />} />
                    <Route path="search/:Id" element={<Single />} />
                    <Route
                      path="new"
                      element={<New inputs={userInputs} title="Add New User" />}
                    />
                  </Route>
                  <Route path="books">
                    <Route index element={<List columns={postColumns} />} />
                    <Route path="search/:Id" element={<SingleHouse />} />
                    <Route path="new" element={<NewHotel />} />
                  </Route>
                  <Route path="bookings">
                    <Route index element={<List columns={bookingColumns} />} />
                    <Route path="search/:Id" element={<Booking />} />
                  </Route>
                  <Route path="issuebook">
                    <Route index element={<IssueBook />} />
                  </Route>
                  <Route path="returnbook">
                    <Route index element={<ReturnBook />} />
                  </Route>
                  <Route path="profile">
                    <Route index element={<Profile />} />
                  </Route>
                </Routes>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;