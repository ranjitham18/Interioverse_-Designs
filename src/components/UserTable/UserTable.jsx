// displays users list in table
// search, filter, verify, delete users
// sends selected user to parent
import { useState } from "react";
import "./UserTable.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function UserTable({ users, onSelectUser, onDelete, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [popup, setPopup] = useState({
    open: false,
    type: "",
    user: null,
  });

  /* SEARCH + FILTER (SAFE NAME) */
  const filteredUsers = users.filter((u) => {
    const name =
      u.name || u.username || u.registeredName || "";

    const email = u.email || "";
    const kmId = u.kmId || "";
    const role = u.role || "";

    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase()) ||
      kmId.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return matchSearch;
    return matchSearch && role.toLowerCase() === filter;
  });

  const openPopup = (e, type, user) => {
    e.stopPropagation();
    setPopup({ open: true, type, user });
  };

  const handleConfirm = () => {
    if (popup.type === "delete") {
      onDelete(popup.user.mongoId);
    }

    if (popup.type === "verify") {
      onToggleStatus(popup.user.mongoId);
    }

    setPopup({ open: false, type: "", user: null });
  };

  return (
    <>
      {/* SEARCH */}
      <div className="search-row">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>+ XYZ</button>
      </div>

      {/* FILTER */}
      <div className="filter-row">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          Show all
        </button>

        <button
          className={filter === "designer" ? "active" : ""}
          onClick={() => setFilter("designer")}
        >
          Designer
        </button>

        <button
          className={filter === "agent" ? "active" : ""}
          onClick={() => setFilter("agent")}
        >
          Agent
        </button>

        <button
          className={filter === "user" ? "active" : ""}
          onClick={() => setFilter("user")}
        >
          User
        </button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>User Profile ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th className="projects-col">Projects</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, index) => {
              const displayName =
                u.name || u.username || u.registeredName || "";

              return (
                <tr
                  key={u.kmId}
                  onClick={() => {
                    setSelectedRowId(u.kmId);
                    onSelectUser(u);
                  }}
                  className={`${index % 2 === 0 ? "table-row-even" : "table-row-odd"} ${
                    selectedRowId === u.kmId ? "active-row" : ""
                  }`}
                >
                  <td className="id-cell">
                   <FaUserCircle size={34} color="#6b7280" />
  <span className="id-text"></span> 
                    <span className="id-text">{u.kmId}</span>
                  </td>

                  {/*  NAME WILL SHOW */}
                  <td>{displayName}</td>

                  <td>{u.email}</td>
                  {/* <td>{u.date}</td> */}
                  <td>{u.signupDate}</td>

                  <td>{u.projectsCount || 0}</td>

                  <td>
                    <span
                      className={
                        u.status === "verified"
                          ? "verified"
                          : "not-verified"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        if (u.status !== "verified") {
                          openPopup(e, "verify", u);
                        }
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="delete-small"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPopup(e, "delete", u);
                      }}
                    >
                      <MdDeleteOutline size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* POPUP */}
      {popup.open && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>
              {popup.type === "delete"
                ? "Delete User"
                : "Change Verification"}
            </h3>

            <p>
              {popup.type === "delete" ? (
                <>
                  Are you sure you want to delete user{" "}
                  <strong>{popup.user.name}</strong>?
                </>
              ) : (
                <>
                  Are you sure you want to verify{" "}
                  <strong>{popup.user.name}</strong> user?
                </>
              )}
            </p>

            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setPopup({ open: false, type: "", user: null })
                }
              >
                Cancel
              </button>

              <button className="confirm-btn" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserTable;

