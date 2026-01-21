// shows full details of selected user
// name, email, addresss, signup,etc.
import { useState } from "react";
import "./UserDetails.css";

function UserDetails({ user, onDelete }) {
  const [showPopup, setShowPopup] = useState(false);

  if (!user) return null;

  //  SAFE NAME (SAME LOGIC AS UserTable)
  const displayName =
    user.name || user.username || user.registeredName || "-";

  return (
    <>
      <div className="user-details-card">
        {/* NAME (TOP CENTER) */}
        <h2
          className={`user-name ${
            user.status !== "verified" ? "center-user-name" : ""
          }`}
        >
          {displayName}

          {user.status === "verified" && (
            <span className="status-icon verified-icon">✔</span>
          )}
        </h2>

        {/* ROLE */}
        <span className="role-pill">{capitalize(user.role)}</span>

        {/* DETAILS */}
        <div className="details-list">
          <Detail label="Profile ID" value={user.kmId} />
          <Detail label="Email ID" value={user.email} />
          <Detail label="Phone Number" value={user.phone} />
          <Detail label="User Type" value={capitalize(user.role)} />
          <Detail label="Address" value={user.address} />
          <Detail label="Pin Code" value={user.pincode} />
          <Detail label="Location" value={user.location} />

          <Detail
            label="Instagram Profile"
            value={
              user.instagram ? (
                <a
                  href={`https://instagram.com/${user.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              ) : "-"
            }
          />

          <Detail
            label="LinkedIn Profile"
            value={
              user.linkedin ? (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              ) : "-"
            }
          />

          <Detail label="Referral" value={user.referral} />
          <Detail label="Specialization" value={user.specialization} />
          <Detail label="Experience" value={user.experience} />
          <Detail label="Project Volume" value={user.projectVolume} />
          <Detail label="Registered Name" value={user.registeredName} />
          <Detail label="Tag Line" value={user.tagline} />
          <Detail label="Signup Date" value={user.signupDate} />



        </div>

        {/* DELETE */}
        <button
          className="delete-user-btn"
          onClick={() => setShowPopup(true)}
        >
          Delete User
        </button>
      </div>

      {/* DELETE POPUP */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Delete User</h3>
            <p>
              Are you sure you want to delete user{" "}
              <b>{user.name}</b>?
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
                  onDelete(user.mongoId);
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

function Detail({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <p>{value || "-"}</p>
    </div>
  );
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "-";
}

export default UserDetails;






