import { useState } from "react";
import { useDispatch } from "react-redux";

import usersData from "../../data/userData.json";
import { logout } from "../../redux/authSlice";
import Sidebar from "../../components/Sidebar/Sidebar";
import UserTable from "../../components/UserTable/UserTable";
import UserDetails from "../../components/UserDetails/UserDetails";
import ProjectPanel from "../../components/ProjectPanel/ProjectPanel";

import "./Dashboard.css";


function Dashboard() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState(usersData);
  const [selectedUser, setSelectedUser] = useState(usersData[0]);

 
  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

 
  const handleToggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Verified" ? "Not Verified" : "Verified",
            }
          : u
      )
    );

    setSelectedUser((prev) =>
      prev && prev.id === id
        ? {
            ...prev,
            status: prev.status === "Verified" ? "Not Verified" : "Verified",
          }
        : prev
    );
  };

  return (
    <div className="dashboard">

      
      <div className="users-header">
        <div className="header-left">
          <img src="/logo.jpg" alt="logo" className="header-logo" />
          <h4 className="header-title">Users</h4>
        </div>

        <div className="header-right">
          <button
            className="logout-btn"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
          <img
            src="/avatar.jpg"
            alt="user"
            className="header-avatar"
          />
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
            <UserDetails
              user={selectedUser}
              onDelete={handleDeleteUser}
            />
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

export default Dashboard;


