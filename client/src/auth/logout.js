import axios from "axios";

const logout = async () => {
  try {
    // when running just the server, change to: "/logout"
    const response = await axios.post(
      "http://localhost:3000/logout",
      {},
      { withCredentials: true },
    );
    console.log("🚩 successful axios request: ", response);
  } catch (error) {
    console.log(error);
  }
};

export { logout };
