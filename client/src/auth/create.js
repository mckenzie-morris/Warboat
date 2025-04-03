import axios from "axios";

const submitCreate = async (setStateFunc) => {
  const submittedUsername = document.getElementById("input-username").value;
  const submittedPassword = document.getElementById("input-password").value;
  const confirmedPassword = document.getElementById("input-confirm-password").value;
  try {
    const response = await axios.post(
      // when running just the server, change to: "/login"
      "http://localhost:3000/profiles",
      // request config object
      {
        submittedUsername: submittedUsername,
        submittedPassword: submittedPassword,
        confirmedPassword: confirmedPassword
      },
      /* `withCredentials` indicates whether or not cross-site Access-Control requests
        should be made using credentials (such as cookies, authentication headers or 
        TLS client certificates) */
      { withCredentials: true },
    );
    console.log("successful profile creation ✅", response.data);
    setStateFunc(response.data);
  } catch (error) {
    console.log(error.response?.data);
    return error.response?.data
  }
};

export {submitCreate}