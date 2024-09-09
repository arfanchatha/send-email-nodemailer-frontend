import { useState } from "react";
import "./index.css";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { sendEmails } from "./apiFetching/apiFeatures";

import DeleteUploadedFiles from "./handleUploadFiles/DeleteUploadedFiles";
import UploadFiles from "./handleUploadFiles/UploadFiles";
import CredtentialForm from "./ui/CredtentialForm";
import EmailForm from "./ui/EmailForm";
import UserManualModel from "./ui/UserManualModel";

import UploadedFilesNames from "./handleUploadFiles/UploadedFilesNames";

function App() {
  const queryClient = useQueryClient();
  const [value, setValue] = useLocalStorage(Date.now(), "tempId");
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: sendEmails,
    onSuccess: (data) => {
      toast.success(
        `Email sent to ${data?.data?.recipient?.length} recipient ${data?.message}`
      );

      queryClient.resetQueries(["uploadedFiles", value]);
    },
    onError: (error) => {
      const newError = `${error?.response.data.error}`.startsWith("ENOENT")
        ? "You have not uploaded any file, please first upload the file with email name."
        : `${error?.response.data.message}`.includes(
            "Error: Failed to send email to"
          )
        ? error?.response.data?.message
        : error?.response.data.message;

      toast.error(newError);
      queryClient.resetQueries(["uploadedFiles", value]);
      // toast.error(error.message);
    },
  });
  const sendingEmailStatus = mutation?.isPending;

  const [formData, setFormData] = useState({
    user: "",
    pass: "",
    host: "",
    port: "",
    subject: "",
    cc: "",
    body: "",
    tempId: value,
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
      cc: "",
      body: "",
      tempId: value,
    });
  };

  return (
    <div>
      <div className="container">
        <button
          className="modal-button"
          onClick={() => setModalOpen((open) => !open)}
        >
          {modalOpen ? "Close User Manual" : "Open User Manual"}
        </button>
        {modalOpen && <UserManualModel />}
        {!modalOpen && (
          <>
            <h1>Send Emails With One Click</h1>
            <div className="form-container">
              <div className="left-section">
                <UploadFiles
                  tempId={value}
                  sendingEmailStatus={sendingEmailStatus}
                />
                <UploadedFilesNames
                  tempId={value}
                  sendingEmailStatus={sendingEmailStatus}
                />
                <DeleteUploadedFiles
                  tempId={value}
                  sendingEmailStatus={sendingEmailStatus}
                />
                <EmailForm
                  formData={formData}
                  handleChange={handleChange}
                  sendingEmailStatus={sendingEmailStatus}
                />
              </div>

              <div className="right-section">
                <CredtentialForm
                  formData={formData}
                  handleChange={handleChange}
                  sendingEmailStatus={sendingEmailStatus}
                />
                <div className="send-email-buttons">
                  <button
                    className="send-button"
                    onClick={() => mutation.mutate(formData)}
                    disabled={sendingEmailStatus}
                  >
                    {mutation.isPending ? "Sending..." : "Send Now"}
                  </button>
                  <button
                    className="clear-button"
                    onClick={handleClear}
                    disabled={sendingEmailStatus}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
