import {
  GET_COMPANIES_FAILURE,
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
} from "./actionTypes";

const initialState = {
  companies: [],

  isGetCompaniesSending: false,
  isGetCompaniesSucceed: false,
  isGetCompaniesError: false,
  getCompaniesErrorMessage: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPANIES_REQUEST:
      return {
        ...state,
        isGetCompaniesSending: true,
        isGetCompaniesSucceed: false,
        isGetCompaniesError: false,
        getCompaniesErrorMessage: "",
      };
    case GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: [...state.companies, ...action.payload],
        isGetCompaniesSending: false,
        isGetCompaniesSucceed: true,
      };
    case GET_COMPANIES_FAILURE:
      return {
        ...state,
        isGetCompaniesSending: false,
        isGetCompaniesError: true,
        getCompaniesErrorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
