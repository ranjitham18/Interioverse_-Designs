// common layout for auth pages
// wraps login and signup with same UI design

import "./AuthLayout.css";
import logo from "../../assets/logo.jpg";
function AuthLayout({ children, title }) {
  return (
    <div className="auth-page">
      {/* HEADER */}
      <header className="auth-header">
         <img src={logo} alt="logo" className="auth-logo" />
      </header>

      {/* BACKGROUND IMAGE + CARD */}
      <div className="auth-wrapper">
        <div className="auth-image-box">
          <div className="auth-card">
            <h2>{title}</h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
