import "../index.css";

import { deleteFiles } from "../../apiFeatures";

import { useMutation } from "@tanstack/react-query";

function DeleteUploadedFiles() {
  const mutation = useMutation({
    mutationFn: deleteFiles, // The function making the API call
    onSuccess: (data) => {
      console.log("Files deleted successfully:", data);
    },
    onError: (error) => {
      console.error("Error deleting files:", error);
    },
  });

  return (
    <div className="delete-option">
      <label className="delete-files">Delete files if send email fails</label>
      <button
        className="upload-button"
        onClick={() => mutation.mutate()}
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? "Deleting..." : "Delete All"}
      </button>
    </div>
  );
}

export default DeleteUploadedFiles;
