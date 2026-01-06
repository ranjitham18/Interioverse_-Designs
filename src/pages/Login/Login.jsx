import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userError, setUserError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleVerify = () => {
    setUserError(false);
    setPassError(false);
    setLoginError(false);

    if (!username) {
      setUserError(true);
      return;
    }

    if (!password) {
      setPassError(true);
      return;
    }

    if (username === "admin" && password === "1234") {
      dispatch(login());
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <img src="/logo.jpg" alt="logo" className="app-logo" />
      </div>
      <div className="login-body">
        
        <div className="image-card">
          <div className="login-card">

            <h3>Log in to account</h3>

            
            <p>User Name</p>
            <input
              className="login-input"
              placeholder="User Name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUserError(false);
              }}
            />
            {userError && <p className="error">Username is required*</p>}

           
            <p>Password</p>
            <div className="password-wrapper">
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPassError(false);
                }}
              />
              {userError && <p className="error">
                Password is required*</p>}

              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } password-icon`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {passError && <p className="error">Password is required*</p>}
            {loginError && (
              <p className="error">Invalid username or password</p>
            )}

            <button onClick={handleVerify}>Verify</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;




