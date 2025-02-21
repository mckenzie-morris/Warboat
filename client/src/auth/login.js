import axios from "axios";

const submitCredentials = async () => {
  const submittedUsername = document.getElementById("input-username").value;
  const submittedPassword = document.getElementById("input-password").value;
  console.log("🚩🚩🚩 credentials: ", submittedUsername, submittedPassword);
  try {
    const response = await axios.post(
      // when running just the server, change to: "/login"
      "http://localhost:3000/login",
      // request config object
      {
        submittedUsername: submittedUsername,
        submittedPassword: submittedPassword,
      },
      /* `withCredentials` indicates whether or not cross-site Access-Control requests
      should be made using credentials (such as cookies, authentication headers or 
      TLS client certificates) */
      { withCredentials: true },
    );
    console.log("🚩 successful axios request: ", response);
  } catch (error) {
    console.log(error);
  }
};

export { submitCredentials };
