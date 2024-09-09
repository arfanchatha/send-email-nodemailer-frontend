import "../index.css";

import { deleteFiles } from "../apiFetching/apiFeatures";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function DeleteUploadedFiles({ tempId, sendingEmailStatus }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteFiles,
    onSuccess: (data) => {
      // Invalidate and refetch the uploaded files names query
      toast.success(data.message);
      queryClient.resetQueries(["uploadedFiles", tempId]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDelete = function () {
    mutation.mutate(tempId);
  };

  return (
    <div className="delete-option">
      <label className="delete-files">Delete files if send email fails</label>
      <button
        className="upload-button"
        onClick={handleDelete}
        disabled={mutation.isPending || sendingEmailStatus}
      >
        {mutation.isPending ? "Deleting..." : "Delete All"}
      </button>
    </div>
  );
}

export default DeleteUploadedFiles;
