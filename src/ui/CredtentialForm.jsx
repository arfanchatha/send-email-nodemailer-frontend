import { useState } from "react";
import "../index.css";
import { BiHide, BiShow } from "react-icons/bi";

function CredtentialForm({ formData, handleChange, sendingEmailStatus }) {
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
        required={true}
        disabled={sendingEmailStatus}
      />
      <div className="password-container">
        <input
          type={passwordVisible ? "text" : "password"}
          name="pass"
          value={formData.pass || ""}
          placeholder="PASSWORD"
          className="smtp-input"
          onChange={handleChange}
          required={true}
          disabled={sendingEmailStatus}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <BiHide size="30px" /> : <BiShow size="30px" />}
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
        disabled={sendingEmailStatus}
      />
      <input
        type="text"
        name="port"
        value={formData.port || ""}
        placeholder="PORT: Leave empty if don't know port"
        className="smtp-input"
        onChange={handleChange}
        disabled={sendingEmailStatus}
      />
    </>
  );
}

export default CredtentialForm;
