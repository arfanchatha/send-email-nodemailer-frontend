import axios from "axios";

const backendHost = "https://send-email-nodemailer-backend.onrender.com";

export const deleteFiles = async () => {
  const response = await axios.delete(
    `${backendHost}/api/v1/deleteuploadedfiles`
  );
  console.log(response);
  return response.data;
};

export const sendEmails = async (emailData) => {
  const response = await axios.post(
    `${backendHost}/api/v1/sendemailsfromattachments`,
    emailData
  );
  return response.data;
};
