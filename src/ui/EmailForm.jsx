import "../index.css";

function EmailForm({ formData, handleChange }) {
  return (
    <div className="email-details">
      <input
        type="text"
        name="subject"
        placeholder="EMAIL SUBJECT"
        className="subject"
        value={formData.subject || ""}
        onChange={handleChange}
      />

      <textarea
        placeholder="Email body"
        className="body"
        name="body"
        value={formData.body || ""}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default EmailForm;
