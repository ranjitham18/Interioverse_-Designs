import "./Sidebar.css";

function Sidebar({ active = "Users" }) {
  return (
    <div className="sidebar">
      <div className="quick-header">
        <span className="quick-title">Quick Actions</span>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <button className={`sidebar-item ${active === "Dashboard" ? "active" : ""}`}>
        <span className="plus-box">+</span>
        <span>Dashboard</span>
      </button>

      <button className={`sidebar-item ${active === "Properties" ? "active" : ""}`}>
        <span className="plus-box">+</span>
        <span>Properties</span>
      </button>

      <button className={`sidebar-item ${active === "Models" ? "active" : ""}`}>
        <span className="plus-box">+</span>
        <span>Models</span>
      </button>

      <button className={`sidebar-item ${active === "Users" ? "active" : ""}`}>
        <span className="plus-box">+</span>
        <span>Users</span>
      </button>

      <button className={`sidebar-item ${active === "Settings" ? "active" : ""}`}>
        <span className="plus-box">+</span>
        <span>Settings</span>
      </button>
    </div>
  );
}

export default Sidebar;
