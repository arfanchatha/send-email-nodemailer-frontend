import axios from "axios";

const backendHost = "https://send-email-nodemailer-backend.onrender.com";

export const deleteFiles = async (tempId) => {
  const response = await axios.delete(
    `${backendHost}/api/v1/deleteuploadedfiles/${tempId}`
  );

  return response.data;
};
export const deleteFileWithName = async (filePath) => {
  const [tempId, fileName] = filePath.split("/");

  const response = await axios.delete(
    `${backendHost}/api/v1/deletfilewithname/${tempId}/${fileName}`
  );

  return response.data;
};

export const sendEmails = async (emailData) => {
  const response = await axios.post(
    `${backendHost}/api/v1/sendemailsfromattachments`,
    emailData
  );
  return response.data;
};
export const getUploadedFilesNames = async (tempId) => {
  const response = await axios.get(
    `${backendHost}/api/v1/uploadfilesnames/${tempId}`
  );

  return response.data;
};
