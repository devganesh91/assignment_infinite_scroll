import Reflux from "reflux";

import axios from "../axiosInstance";

const Actions = Reflux.createActions({
  getcompanies: { children: ["success", "failure"] },
});

Actions.getcompanies.listen(function (payload) {
  console.log(payload);
  axios({
    method: "POST",
    url: "https://tracxn.com/api/2.2/companies",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    data: payload,
  })
    .then((res) => {
      console.log("action", res);
      const { errcode, message, result } = res.data;
      if (errcode !== undefined) {
        this.failure(message);
      } else {
        this.success(result);
      }
    })
    .catch((err) => {
      console.error(err);
      this.failure(err.message);
    });
});

export default Actions;
