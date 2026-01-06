import { useState } from "react";
import "./UserTable.css";
import { MdDeleteOutline } from "react-icons/md";


function UserTable({ users, onSelectUser, onDelete, onToggleStatus }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedRowId, setSelectedRowId] = useState(null);



  const [popup, setPopup] = useState({
    open: false,
    type: "",
    user: null,
  });

  
const getAvatar = (name) => {
  const girlNames = [
    "ranjitha",
    "anita",
    "priya",
    "sneha",
    "kavya",
    "pooja",
    "divya",
    "lakshmi"
  ];


  const firstName = name.split(" ")[0].toLowerCase();

  
  if (girlNames.includes(firstName)) {
    return "/girl.png";
  }

  
  return "/boy.png";
};

  
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());

    if (filter === "all") return matchSearch;
    return matchSearch && u.role.toLowerCase() === filter;
  });

  
  const openPopup = (e, type, user) => {
    e.stopPropagation();
    setPopup({ open: true, type,user });
  };

  
  const handleConfirm = () => {
    
   

    if(popup.type === "delete"){
      onDelete(popup.user.id);
    }
    if (popup.type === "verify") {
      onToggleStatus(popup.user.id);
    }
    setPopup({ open: false, type: "", user: null });
  };

  return (
    <>
      
      <div className="search-row">
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>+ XYZ</button>
      </div>

     
      <div className="filter-row">
  <button
    className={filter === "all" ? " active" : ""}
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
          {filteredUsers.map((u, index) => (
            
               <tr
                key={u.id}
                onClick={() => {
                 setSelectedRowId(u.id);
                  onSelectUser(u);
                     }}
                     className={`${index % 2 === 0 ? "table-row-even" : "table-row-odd"} ${
                       selectedRowId === u.id ? "active-row" : ""
                           }`}
                            >

              
      <td className="id-cell">
                <img
                  src={getAvatar(u.name)}
                  alt="avatar"
                  className="table-avatar"
                />
                <span className="id-text">{u.id}</span>
              </td>

              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.date}</td>
              <td>{u.projectsCount}</td>

             
              <td>
                {/*
                <span
                  className={
                    u.status === "Verified"
                      ? "verified"
                      : "not-verified"
                  }
                  onClick={(e) =>{
                     e.stopPropagation();   
                    openPopup(e, "verify", u)
                  }}
                >
                  {u.status}
                </span>
                */}
                <span
  className={u.status === "Verified" ? "verified" : "not-verified"}
  onClick={(e) => {
    e.stopPropagation();

    // ✅ popup ONLY for Not Verified
    if (u.status === "Not Verified") {
      openPopup(e, "verify", u);
    }
  }}
>
  {u.status}
</span>


              </td>

             
              <td>
                {/*
                <button
                  className="delete-small"
                  onClick={(e) =>{
                     e.stopPropagation();   
                    openPopup(e, "delete", u)
                  }}
                >
                  
                  <img src="/delete.png" alt="delete" />
                </button>
                */}
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
          ))}
        </tbody>
      </table>
      </div>

      
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
               <strong>{popup.user.id}</strong>?
               </>
  ) : (
    <>
      Are you sure you want to verify{" "}
      <strong>{popup.user.id}</strong> user?
    </>
  )}
</p>


            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setPopup({ open: false, type: "", userId: null })
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleConfirm}
              >
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





