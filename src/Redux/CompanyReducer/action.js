import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
} from "./actionTypes";

import axios from "../axiosInstance";

const getCompanyRequest = () => {
  return {
    type: GET_COMPANIES_REQUEST,
  };
};

const getCompanySuccess = (companies) => {
  return {
    type: GET_COMPANIES_SUCCESS,
    payload: companies,
  };
};

const getCompanyFailure = (error) => {
  return {
    type: GET_COMPANIES_FAILURE,
    payload: error,
  };
};

export const fetchCompanies = (payload) => (dispatch) => {
  dispatch(getCompanyRequest());
  axios({
    method: "POST",
    url: "https://tracxn.com/api/2.2/companies",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    data: payload,
  })
    .then((res) => {
      const { errcode, message, result } = res.data;
      if (errcode !== undefined) {
        dispatch(getCompanyFailure(message));
      } else {
        dispatch(getCompanySuccess(result));
      }
    })
    .catch((err) => {
      console.error(err);
      dispatch(getCompanyFailure("Something went wrong, Please Try Again later.."));
    });
};
