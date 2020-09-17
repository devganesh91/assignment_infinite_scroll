import axios from "../../../assignment_infinite_scroll/node_modules/axios";

const axiosInstance = axios.create({
  headers: {
    "accesstoken": process.env.REACT_APP_ACCESS_TOKEN,
    "x-request-source": "apiTester",
  },
});

export default axiosInstance;
