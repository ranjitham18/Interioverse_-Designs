// Adnim Dashboard page
// fetches all users
// passess users to table and details
// handles verify, delete, logout
import avatar from "../../assets/avatar.jpg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/authSlice";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserTable from "../../components/UserTable/UserTable";
import UserDetails from "../../components/UserDetails/UserDetails";
import ProjectPanel from "../../components/ProjectPanel/ProjectPanel";

import api from "../../services/api";
import "./Users.css";

/*  GENERATE DISPLAY PROFILE ID (UI ONLY) */
/*const generateProfileId = (name, role, mongoId) => {
  if (!name || !role || !mongoId) return "-";

  const roleMap = {
    user: "USR",
    designer: "DES",
    agent: "AGN",
    // admin: "ADM",
  };

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const shortId = mongoId.slice(-4).toUpperCase();

  return `${roleMap[role] || "USR"}${initials}${shortId}`;
};*/

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  /*  AUTH CHECK (RUNS ON REFRESH) */
 /* useEffect(() => {
    const checkAuth = async () => {
      try {
        // await api.get("/api/auth/me");
        const res = await api.get("/api/auth/me");

        //  ADMIN-ONLY ACCESS
        if (res.data.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }
        setCheckingAuth(false);
      } catch (erro) {
         
        navigate("/", { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);*/
   useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/me");

        // 🔴 ADMIN-ONLY ACCESS
        if (res.data.role !== "admin") {
          navigate("/", { replace: true });
          return;
        }

        setCheckingAuth(false);
      } catch (err) {
        console.error("AUTH CHECK FAILED:", err.response?.status);
        navigate("/", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);


  /*  FETCH USERS (ADMIN ONLY) */
  useEffect(() => {
    if (checkingAuth) return;

    api.get("/api/admin/users").then((res) => {
      const sorted = [...res.data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const formatted = sorted.map((u) => ({
        // kmId: generateProfileId(u.name, u.role, u._id),
         kmId: u.profileId, 
        mongoId: u._id,

        name: u.name || "",
        email: u.email || "",
        role: u.role || "user",

        signupDate: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-GB")
          : "-",

        status: u.verified ? "verified" : "not verified",

        phone: u.phone || "",
        address: u.address || "",
        location: u.location || "",
        pincode: u.pincode || "",
        instagram: u.instagram || "",
        linkedin: u.linkedin || "",
        specialization: u.specialization || "",
        experience: u.experience || "",
        projectVolume: u.projectVolume || "",
        registeredName: u.registeredName || "",
        referral: u.referral || "",
        tagline: u.tagline || "",

        projectsList: [],
      }));

      setUsers(formatted);
      setSelectedUser(formatted[0] || null);
    });
  }, [checkingAuth]);

  /*  DELETE USER (TABLE + DETAILS ) */
  const handleDeleteUser = async (mongoId) => {
    await api.delete(`/api/admin/delete/${mongoId}`);

    setUsers((prev) => {
      const updated = prev.filter((u) => u.mongoId !== mongoId);
      setSelectedUser(updated[0] || null);
      return updated;
    });
  };

  /*  VERIFY USER (POPUP + STATUS ) */
  const handleToggleStatus = async (mongoId) => {
    const res = await api.put(`/api/admin/verify/${mongoId}`);

    setUsers((prev) =>
      prev.map((u) =>
        u.mongoId === mongoId
          ? { ...u, status: res.data.verified ? "verified" : "not verified" }
          : u
      )
    );

    if (selectedUser?.mongoId === mongoId) {
      setSelectedUser((prev) => ({
        ...prev,
        status: res.data.verified ? "verified" : "not verified",
      }));
    }
  };

  /*  LOGOUT */
  const handleLogout = async () => {
    await api.post("/api/auth/logout");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  if (checkingAuth) return null;

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="users-header">
        <div className="header-left">
          {/* <img src="/logo.jpg" alt="logo" className="header-logo" /> */}
          <img src={avatar} alt="user" />
          <h4 className="header-title">Users</h4>
        </div>

        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
           

          <img src="/avatar.jpg" alt="user" className="header-avatar" />
        </div>
      </div>

      <div className="body">
        <Sidebar active="Users" />

        <div className="content">
          <UserTable
            users={users}
            onSelectUser={setSelectedUser}
            onDelete={handleDeleteUser}
            onToggleStatus={handleToggleStatus}
          />
        </div>

        <div className="details-section">
          {selectedUser && (
            <UserDetails user={selectedUser} onDelete={handleDeleteUser} />
          )}
        </div>

        <div className="projects-section">
          {selectedUser && (
            <ProjectPanel projects={selectedUser.projectsList} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
