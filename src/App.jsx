import { useState } from "react";
import DeleteUploadedFiles from "./handleUploadFiles/DeleteUploadedFiles";
import UploadFiles from "./handleUploadFiles/UploadFiles";
import "./index.css";

import CredtentialForm from "./ui/CredtentialForm";
import EmailForm from "./ui/EmailForm";
import { useMutation } from "@tanstack/react-query";

import { sendEmails } from "../apiFeatures";

function App() {
  const mutation = useMutation({
    mutationFn: sendEmails,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error sending emails:", error);
    },
  });

  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    host: "",
    port: "",
    subject: "",
    body: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClear = () => {
    setFormData({
      user: "",
      pass: "",
      host: "",
      port: "",
      subject: "",
      body: "",
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Send Emails With One Click</h1>
        <div className="form-container">
          <div className="left-section">
            <UploadFiles />

            <DeleteUploadedFiles />
            <EmailForm formData={formData} handleChange={handleChange} />
          </div>

          <div className="right-section">
            <CredtentialForm formData={formData} handleChange={handleChange} />
            <div className="send-email-buttons">
              <button
                className="send-button"
                onClick={() => mutation.mutate(formData)}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Sending..." : "Send Now"}
              </button>
              <button className="clear-button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
