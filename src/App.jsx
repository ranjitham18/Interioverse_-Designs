// route controller of the app , decides which page opens for which URL

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Users from "./pages/Users/Users";
import ProtectedRoute from "./components/ProtectedRoute";

import api from "./services/api";
import { setAuth, authChecked } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
   const { authChecked: checked } = useSelector((state) => state.auth);

  //  Sync cookie → redux on refresh / back
 useEffect(() => {
  api
    .get("/api/auth/me")
    .then((res) => {
      dispatch(setAuth({ role: res.data.role }));
      dispatch(authChecked()); // ✅ ADD THIS
    })
    .catch(() => {
      dispatch(authChecked());
    });
}, [dispatch]);

  
  if (!checked) return null;
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/signup"
        element={
          <ProtectedRoute allowedRole="user">
            <Signup />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

