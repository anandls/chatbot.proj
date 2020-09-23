import Axios from "./Axios";
import "dotenv/config";
import regeneratorRuntime from "regenerator-runtime";

const tokenize = () => {
  const access_token = localStorage.getItem("access_token");
  const token = JSON.parse(access_token);

  const options = {
    withCredentials: false,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "x-auth-token": token,
    },
  };

  return options;
};

export default {
  user: {
    signUp: (userData) =>
      Axios.post("/api/v1/clients/signup", userData, tokenize()).then(
        (res) => res.data
      ),

    signIn: (userData) =>
      Axios.post("/api/v1/clients/signin", userData, tokenize()).then(
        (res) => res.data
      ),
  },
  message: {
    postMessage: (data) =>
      Axios.post("/api/v1/messages/add", data, tokenize()).then(
        (res) => res.data
      ),
  },
};
