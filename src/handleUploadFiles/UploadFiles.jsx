import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "../index.css";
import toast from "react-hot-toast";

function UploadFiles({ tempId, sendingEmailStatus }) {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [fileNames, setFileNames] = useState("No file selected");
  const queryClient = useQueryClient();

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

  // Mutation to upload files
  const mutation = useMutation({
    mutationFn: async () => {
      if (!selectedFiles) {
        throw new Error("No files selected");
      }

      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      const response = await axios.post(
        `http://localhost:5000/api/v1/uploadfiles/${tempId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onSuccess: () => {
      toast.success("Files uploaded successfully!");

      // Invalidate and refetch the files query
      queryClient.invalidateQueries(["uploadedFiles", tempId]);

      // Reset the file input and file names
      setSelectedFiles(null);
      setFileNames("No file selected");

      // Clear the file input field in the DOM
      document.getElementById("file-input").value = null;
    },
    onError: (error) => {
      if (error.message === "No files selected") {
        toast.error(`Error uploading files: ${error.message}`);
      } else {
        toast.error("Failed to upload files. Please try again.");
      }
    },
  });

  return (
    <>
      <div className="file-upload">
        <label
          htmlFor="file-input"
          className="choose-files"
          aria-disabled={sendingEmailStatus}
        >
          Choose file
        </label>
        <span className="file-name">{fileNames}</span>
        <button
          className="upload-button"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending || sendingEmailStatus}
        >
          {mutation.isPending ? "Uploading..." : "Upload"}
        </button>
        <input
          type="file"
          id="file-input"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide the default file input
          disabled={sendingEmailStatus}
        />
      </div>
    </>
  );
}

export default UploadFiles;
