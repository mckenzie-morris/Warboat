import axios from "axios";

const logout = async () => {
  try {
    // when running just the server, change to: "/logout"
    const response = await axios.post(
      "http://localhost:3000/logout",
      {},
      /* XMLHttpRequest from a different domain cannot set cookie values 
      for their own domain unless withCredentials is set to true before 
      making the request; setting withCredentials has no effect on 
      same-origin requests */
      { withCredentials: true },
    );
    console.log("🚩 successful axios request: ", response);
  } catch (error) {
    console.log(error);
  }
};

export { logout };
