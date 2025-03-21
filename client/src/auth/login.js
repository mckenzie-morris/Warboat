import axios from "axios";

const submitCredentials = async (setStateFunc) => {
  const submittedUsername = document.getElementById("input-username").value;
  const submittedPassword = document.getElementById("input-password").value;
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
    console.log("🚩 successful login: ", response.data);
    setStateFunc(response.data);
  } catch (error) {
    console.log(error.response?.data);
  }
};

export { submitCredentials };
