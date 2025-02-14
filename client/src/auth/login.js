import axios from "axios";

const submitCredentials = async () => {
  const submittedUsername = document.getElementById("input-username").value;
  const submittedPassword = document.getElementById("input-password").value;
  console.log("🚩🚩🚩 credentials: ", submittedUsername, submittedPassword);
  try {
    const response = await axios.post(
      "/login",
      // Request Config object
      {
        submittedUsername: submittedUsername,
        submittedPassword: submittedPassword,
      },
    );
    console.log("🚩 successful axios request: ", response);
  } catch (error) {
    console.log(error);
  }
};

export { submitCredentials };
