import { useState } from "react";
import "../index.css";

function CredtentialForm({ formData, handleChange }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <>
      <h2>
        PLEASE ENTER YOUR EMAIL SMTP SETTINGS <br /> (NO DATA WILL BE SAVED)
      </h2>
      <input
        type="text"
        name="user"
        value={formData.user || ""}
        placeholder="USER NAME"
        className="smtp-input"
        onChange={handleChange}
        required
      />
      <div className="password-container">
        <input
          type={passwordVisible ? "text" : "password"}
          name="pass"
          value={formData.pass || ""}
          placeholder="PASSWORD"
          className="smtp-input"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
      <input
        type="text"
        name="host"
        value={formData.host || ""}
        placeholder="HOST"
        className="smtp-input"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="port"
        value={formData.port || ""}
        placeholder="PORT: Leave empty if don't know port"
        className="smtp-input"
        onChange={handleChange}
      />
    </>
  );
}

export default CredtentialForm;
