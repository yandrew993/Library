import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import apiRequest from "../../lib/apiRequest";
import { DarkModeContext } from "../../context/darkModeContext";
import "./addStudent.scss"; // You can rename this to newStudent.scss if needed

function AddStudent() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    setIsLoading(true);

    try {
      const res = await apiRequest.post("/students", {
        name: inputs.name,
        studentId: inputs.studentId,
      });
      navigate("/students/profile/" + res.data.id); // adjust route if needed
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.error || "Failed to add student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`newBook ${darkMode ? "dark" : "light"}`}>
      <Sidebar />
      <div className="newBookContainer">
        <Navbar />
        <div className="newBookPage">
          <div className="formContainer">
            <div className="wrapper">
              <button className="backButton" onClick={() => navigate(-1)}>
                ← Back
              </button>
              <form onSubmit={handleSubmit}>
                <div className="item">
                  <label htmlFor="name">Student Name</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="item">
                  <label htmlFor="studentId">Student ID</label>
                  <input id="studentId" name="studentId" type="text" required />
                </div>
                <button disabled={isLoading} className="sendButton" type="submit">
                  Add Student
                </button>
                {error && <span className="error">{error}</span>}
                {isLoading && <span className="loading">Adding student...</span>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
