import { useState } from "react";
import axios from "axios";
import "../index.css";

function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [fileNames, setFileNames] = useState("No file selected");

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    if (e.target.files.length > 0) {
      const names = Array.from(e.target.files)
        .map((file) => file.name)
        .join(", ");
      setFileNames(names);
    } else {
      setFileNames("No file selected");
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFiles) {
      alert("Please choose a file first!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const response = await axios.post(
        "https://send-email-nodemailer-backend.onrender.com/api/v1/uploadfiles",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Files uploaded successfully!");

      console.log("Server Response:", response.data);
      // Reset the file input and file names
      setSelectedFiles(null);
      setFileNames("No file selected");

      // Clear the file input field in the DOM
      document.getElementById("file-input").value = null;
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    }
  };

  return (
    <>
      <div className="file-upload">
        <label htmlFor="file-input" className="choose-files">
          Choose file
        </label>
        <span className="file-name">{fileNames}</span>
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
        <input
          type="file"
          id="file-input"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the default file input
        />
      </div>
    </>
  );
}

export default UploadFiles;
