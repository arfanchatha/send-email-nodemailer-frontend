import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFileWithName,
  getUploadedFilesNames,
} from "../apiFetching/apiFeatures";
import { useState } from "react";
import toast from "react-hot-toast";

function UploadedFilesNames({ tempId, sendingEmailStatus }) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState("");

  const { data, error, isLoading } = useQuery({
    queryKey: ["uploadedFiles", tempId],
    queryFn: () => getUploadedFilesNames(tempId), // Pass a function here
    enabled: !!tempId, // Ensure the query only runs if tempId is available
  });

  const mutation = useMutation({
    mutationFn: deleteFileWithName,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.resetQueries(["uploadedFiles", tempId]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message);
    },
  });

  const files = data?.data?.filesName;

  if (isLoading) return <div>Loading files...</div>;

  function handlChange(e) {
    setSelected(() => e.target.value);
  }

  function handleDelete() {
    const filePath = `${tempId}/${selected}`;

    mutation.mutate(filePath);
    setSelected("");
  }

  return (
    <div>
      {files?.length > 0 ? (
        <div>
          <p>
            You have uploaded {files.length}{" "}
            {files?.length > 1 ? "files" : "file"}
          </p>
          <select value={selected} onChange={handlChange}>
            <option value="">List of your uploaded files</option>
            {files?.map((fileName, i) => (
              <option key={i} value={fileName}>
                {i + 1}: {fileName}
              </option>
            ))}
          </select>
          {selected && (
            <button disabled={sendingEmailStatus} onClick={handleDelete}>
              Delete selected file
            </button>
          )}
        </div>
      ) : (
        <p disabled>No file found! Please upload first</p>
      )}
    </div>
  );
}

export default UploadedFilesNames;
