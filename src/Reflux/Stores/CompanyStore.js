import Reflux from "reflux";

import CompanyActions from "../Actions/CompanyAction";

export default class CompanyStore extends Reflux.Store {
  constructor() {
    super();
    this.state = { companies: [], isError: false, errormsg: "" };
    this.listenables = CompanyActions;
  }

  onGetcompanies(payload) {
    console.log("onGetcompanies Called", payload);
  }

  onGetcompaniesSuccess(newcompanies) {
    console.log("onGetcompaniesSuccess Called", newcompanies);
    const { companies } = this.state;
    this.setState({
      companies: [...companies, ...newcompanies],
      isError: false,
    });
  }

  onGetcompaniesFailure(message) {
    console.log("onGetcompaniesFailure Called", message);
    this.setState({ isError: true });
  }
}
