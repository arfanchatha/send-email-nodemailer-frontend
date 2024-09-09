import "../index.css";

function EmailForm({ formData, handleChange, sendingEmailStatus }) {
  return (
    <div className="email-details">
      <input
        type="text"
        name="cc"
        placeholder="Cc"
        className="subject"
        value={formData.cc || ""}
        onChange={handleChange}
        disabled={sendingEmailStatus}
      />
      <input
        type="text"
        name="subject"
        placeholder="EMAIL SUBJECT"
        className="subject"
        value={formData.subject || ""}
        onChange={handleChange}
        required={true}
        disabled={sendingEmailStatus}
      />

      <textarea
        placeholder="Email body"
        className="body"
        name="body"
        value={formData.body || ""}
        onChange={handleChange}
        required={true}
        disabled={sendingEmailStatus}
      ></textarea>
    </div>
  );
}

export default EmailForm;
