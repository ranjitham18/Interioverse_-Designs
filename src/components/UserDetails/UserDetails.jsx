
import { useState } from "react";
import "./UserDetails.css";

function UserDetails({ user, onDelete }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="user-details-card">
        {/*
        <h2 className="user-name">
  {user.name}

  <span
    className={`status-icon ${
      user.status === "Verified"
        ? "verified-icon"
        : "not-verified-icon"
    }`}
  >
    {user.status === "Verified" ? "✔" : ""}
  </span>
</h2>
*/}
<h2
  className={`user-name ${
    user.status !== "Verified" ? "center-user-name" : ""
  }`}
>
  {user.name}

  {user.status === "Verified" && (
    <span className="status-icon verified-icon">✔</span>
  )}
</h2>


        
        <span className="role-pill">{user.role}</span>

        
        <div className="details-list">
          <div className="detail-row"><span>Profile ID</span><p>{user.id}</p></div>
          <div className="detail-row"><span>Email ID</span><p>{user.email}</p></div>
          <div className="detail-row"><span>Phone Number</span><p className="email-value">{user.phone}</p></div>
          <div className="detail-row"><span>User Type</span><p>{user.role}</p></div>
          <div className="detail-row"><span>Address</span><p>{user.address}</p></div>
          <div className="detail-row"><span>Pin Code</span><p>{user.pincode}</p></div>
          <div className="detail-row"><span>Location</span><p>{user.location}</p></div>
          <div className="detail-row"><span>Instagram Profile</span><a href="https://www.instagram.com/ranjitha_gowda1218" target="_blank" rel="noreferrer">Instagram</a></div>
          <div className="detail-row"><span>LinkedIn Profile</span><a href="https://www.linkedin.com/in/ranjitha-m-ece" target="_blank" rel="noreferrer">LinkedIn</a></div>
          <div className="detail-row"><span>Referral count</span><p>{user.referral}</p></div>
          <div className="detail-row"><span>Specialization</span><p>{user.specialization}</p></div>
          <div className="detail-row"><span>Experience</span><p>{user.experience}</p></div>
          <div className="detail-row"><span>Project Volume</span><p>{user.projectVolume}</p></div>
          <div className="detail-row"><span>Brand Name</span><p>{user.brand}</p></div>
          <div className="detail-row"><span>Registered Name</span><p>{user.registeredname}</p></div>
          <div className="detail-row"><span>Tag Line</span><p>{user.tagline}</p></div>
      
          <div className=" detail-row logo-row">
           <span>Logo</span>
           <div className="logo-value">
            <img src="/brand-logo.png" alt="Brand Logo" />
           </div>
           </div>


          <div className="detail-row"><span>SignUp Date</span><p>{user.signup}</p></div>
          </div>

        
        <button
          className="delete-user-btn"
          onClick={() => setShowPopup(true)}
        >
          Delete User
        </button>
      </div>

      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete User</h3>
            <p>
              Are you sure you want to delete user <b>{user.id}</b>?
            </p>

            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={() => {
                  onDelete(user.id);
                  setShowPopup(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetails;




