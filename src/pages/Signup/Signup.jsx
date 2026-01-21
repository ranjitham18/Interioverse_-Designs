// user registraction form
// collects user details
// sends data to api/auth/signup
// redirects after success

/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import api from "../../services/api";
import { logout } from "../../redux/authSlice";
function Signup() {
  const navigate = useNavigate();
    const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    pincode: "",
    location: "",
    instagram: "",
    linkedin: "",
    referral: "",
    specialization: "",
    experience: "",
    projectVolume: "",
    registeredName: "",
    tagline: ""
  });

  const [errors, setErrors] = useState({});

  // 🔒 STRICT CONTROLLED INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    // PHONE
    if (name === "phone") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, phone: "Only numbers allowed" }));
        return;
      }
      if (value.length > 10) return;
    }

    // PINCODE
    if (name === "pincode") {
      if (!/^\d*$/.test(value)) {
        setErrors((prev) => ({ ...prev, pincode: "Only numbers allowed" }));
        return;
      }
      if (value.length > 6) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  //  FINAL VALIDATION
  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name* is required";

    if (!form.email) e.email = "Email* is required";
    else if (!form.email.includes("@"))
      e.email = "Email must contain @";

    if (!form.phone) e.phone = "Phone number* is required";
    else if (form.phone.length !== 10)
      e.phone = "Phone must be exactly 10 digits";

    if (!form.role) e.role = "Role* is required";
    if (!form.address) e.address = "Address* is required";

    if (!form.pincode) e.pincode = "Pincode* is required";
    else if (form.pincode.length !== 6)
      e.pincode = "Pincode must be exactly 6 digits";

    if (!form.location) e.location = "Location* is required";
    // if (!form.referral) e.referral = "Referral* is required";
    if (!form.specialization) e.specialization = "Specialization* is required";
    if (!form.experience) e.experience = "Experience* is required";
    if (!form.projectVolume) e.projectVolume = "Project volume* is required";
    if (!form.registeredName)
      e.registeredName = "Registered name* is required";

    return e;
  };

  //  SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await api.post("/api/auth/signup", {
        ...form,
        experience: String(form.experience),
        projectVolume: String(form.projectVolume)
      });
       dispatch(logout());
      navigate("/login", { replace: true });

      // navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout title="User Registration">
      <form onSubmit={handleSubmit}>

        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="phone"
          value={form.phone}
          placeholder="Phone"
          maxLength={10}
          inputMode="numeric"
          onPaste={(e) => e.preventDefault()}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="designer">Designer</option>
          <option value="agent">Agent</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <input name="address" value={form.address} placeholder="Address" onChange={handleChange} />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          name="pincode"
          value={form.pincode}
          placeholder="Pincode"
          maxLength={6}
          inputMode="numeric"
          onPaste={(e) => e.preventDefault()}
          onChange={handleChange}
        />
        {errors.pincode && <p className="error">{errors.pincode}</p>}

        <input name="location" value={form.location} placeholder="Location" onChange={handleChange} />
        {errors.location && <p className="error">{errors.location}</p>}

        <input name="instagram" value={form.instagram} placeholder="Instagram (optional)" onChange={handleChange} />
        <input name="linkedin" value={form.linkedin} placeholder="LinkedIn (optional)" onChange={handleChange} />

        <input name="referral" value={form.referral} placeholder="Referral (optional)" onChange={handleChange} />
        {errors.referral && <p className="error">{errors.referral}</p>}

        <input name="specialization" value={form.specialization} placeholder="Specialization" onChange={handleChange} />
        {errors.specialization && <p className="error">{errors.specialization}</p>}

        <input name="experience" value={form.experience} placeholder="Experience" onChange={handleChange} />
        {errors.experience && <p className="error">{errors.experience}</p>}

        <input name="projectVolume" value={form.projectVolume} placeholder="Project Volume" onChange={handleChange} />
        {errors.projectVolume && <p className="error">{errors.projectVolume}</p>}

        <input name="registeredName" value={form.registeredName} placeholder="Registered Name" onChange={handleChange} />
        {errors.registeredName && <p className="error">{errors.registeredName}</p>}

        <input name="tagline" value={form.tagline} placeholder="Tagline (optional)" onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </AuthLayout>
  );
}

export default Signup;*/
// user registration form
// user login -> signup -> auto logout -> login page

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AuthLayout from "../../components/AuthLayout/AuthLayout";
import api from "../../services/api";
import { logout } from "../../redux/authSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    pincode: "",
    location: "",
    instagram: "",
    linkedin: "",
    referral: "",
    specialization: "",
    experience: "",
    projectVolume: "",
    registeredName: "",
    tagline: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;
    if (name === "pincode" && (!/^\d*$/.test(value) || value.length > 6)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone.length !== 10) e.phone = "Phone must be 10 digits";
    if (!form.role) e.role = "Role required";
    if (!form.address) e.address = "Address required";
    if (form.pincode.length !== 6) e.pincode = "Pincode must be 6 digits";
    if (!form.location) e.location = "Location required";
    if (!form.specialization) e.specialization = "Specialization required";
    if (!form.experience) e.experience = "Experience required";
    if (!form.projectVolume) e.projectVolume = "Project volume required";
    if (!form.registeredName) e.registeredName = "Registered name required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      // 1️⃣ Signup API
      await api.post("/api/auth/signup", {
        ...form,
        experience: String(form.experience),
        projectVolume: String(form.projectVolume)
      });

      // 2️⃣ CLEAR BACKEND COOKIE (THIS WAS MISSING)
      await api.post("/api/auth/logout");

      // 3️⃣ CLEAR REDUX
      dispatch(logout());

      // 4️⃣ REDIRECT TO LOGIN
      navigate("/login", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout title="User Registration">
      <form onSubmit={handleSubmit}>

        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input name="email" value={form.email} placeholder="Email" onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="designer">Designer</option>
          <option value="agent">Agent</option>
          <option value="user">User</option>
        </select>
        {errors.role && <p className="error">{errors.role}</p>}

        <input name="address" value={form.address} placeholder="Address" onChange={handleChange} />
        <input name="pincode" value={form.pincode} placeholder="Pincode" onChange={handleChange} />
        <input name="location" value={form.location} placeholder="Location" onChange={handleChange} />

        <input name="specialization" value={form.specialization} placeholder="Specialization" onChange={handleChange} />
        <input name="experience" value={form.experience} placeholder="Experience" onChange={handleChange} />
        <input name="projectVolume" value={form.projectVolume} placeholder="Project Volume" onChange={handleChange} />
        <input name="registeredName" value={form.registeredName} placeholder="Registered Name" onChange={handleChange} />
        <input name="tagline" value={form.tagline} placeholder="Tagline (optional)" onChange={handleChange} />

        <button type="submit">Signup</button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
