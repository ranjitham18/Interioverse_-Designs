// Login screen UI+ login
// takes role and password
// Redirects based on role

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAuth } from "../../redux/authSlice";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../services/api";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    role: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setLoginError("");
  };

  // LOGIN
  /*const handleLogin = async () => {
  const newErrors = {};
  if (!form.role) newErrors.role = "Role is required";
  if (!form.password) newErrors.password = "Password is required";

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;
// setLoading(true);
  try {
    const res = await api.post("/api/auth/login", {
      role: form.role,
      password: form.password
    });

    console.log("LOGIN RESPONSE 👉", res.data);

    const { role } = res.data;
    dispatch(setAuth({ role }));

    if (role === "admin") {
      navigate("/users", { replace: true });
    } else {
      navigate("/signup", { replace: true });
    }

  } catch (err) {
      console.error("LOGIN FAILED:", err.response?.data || err.message);
      setLoginError(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    }
    // } finally {setLoading(false);}
};
*/
 const handleLogin = async () => {
    const errs = {};
    if (!form.role) errs.role = "Role is required";
    if (!form.password) errs.password = "Password is required";

    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      const res = await api.post("/api/auth/login", form);

      console.log("LOGIN RESPONSE:", res.data);

      const role = res?.data?.role;
      if (!role) {
        throw new Error("Role missing in login response");
      }

      dispatch(setAuth({ role }));

      if (role === "admin") {
        navigate("/users", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setLoginError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    }
  };



  return (
    <AuthLayout title="Log in to account">
    


      
      <p className="input-label">Role</p>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="admin">admin</option>
        <option value="user">user</option>
      </select>
      {errors.role && <p className="error">{errors.role}</p>}

      
      <p className="input-label">Password</p>
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
        />
        <span
          className="password-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errors.password && <p className="error">{errors.password}</p>}

      {loginError && <p className="error">{loginError}</p>}

      <button onClick={handleLogin}>Login</button>
       
    </AuthLayout>
  );
}

export default Login;
