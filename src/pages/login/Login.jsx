
import { useContext, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  const formData = new FormData(e.target);

  const userId = formData.get("userId");
  const password = formData.get("password");

  try {
    const res = await apiRequest.post("/auth/login", { userId, password });
    const { role } = res.data.user;
    console.log("Login Response:",role);

    if (role === "teacher" || role === "librarian") {
      updateUser(res.data);
      
      navigate("/");
    } else {
      setError("Not Authorized!");
    }
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="userId"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="UserId"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
        <a href="https://e-housing.vercel.app/login">Not a Guest?</a>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
