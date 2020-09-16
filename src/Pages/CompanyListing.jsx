import React, { Component } from "react";
import CompanyCard from "../ReuseableComponents/CompanyCard";
import { connect } from "react-redux";
import { fetchCompanies } from "../Redux/CompanyReducer/action";
import { Card } from "antd";
import styles from "../Styles/Listing.module.css";

const { Meta } = Card;

class CompanyListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      size: 20,
    };
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleObserver.bind(this), {
      rootMargin: "100px",
    });
    this.observer.observe(this.loadingRef);
  }

  componentWillUnmount() {
    this.observer.unobserve(this.loadingRef);
  }

  handleObserver(entities) {
    console.log(entities, entities[0].isIntersecting);
    if (entities[0].isIntersecting) {
      const { from, size } = this.state;
      this.props.fetchCompanies({
        size: size,
        from: from,
      });
      this.setState({ from: from + size });
    }
  }

  render() {
    const {
      companies,
      isGetCompaniesError,
      getCompaniesErrorMessage,
    } = this.props;
    return (
      <div>
        <h3>Listing Page</h3>
        <div className={styles.companyCardCont}>
          {companies &&
            companies.map((company, index) => {
              return <CompanyCard key={company.id + index} {...company} />;
            })}
        </div>
        <div
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
          className={styles.loadingCards}
        >
          <Card style={{ width: "600px", marginTop: 16 }} loading={true}>
            <Meta title="Card title" description="This is the description" />
          </Card>
          <Card style={{ width: "600px", marginTop: 16 }} loading={true}>
            <Meta title="Card title" description="This is the description" />
          </Card>
        </div>
        {isGetCompaniesError ? <p>{getCompaniesErrorMessage}</p> : <p></p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  companies: state.companies,
  isGetCompaniesSending: state.isGetCompaniesSending,
  isGetCompaniesError: state.isGetCompaniesError,
  getCompaniesErrorMessage: state.getCompaniesErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCompanies: (payload) => dispatch(fetchCompanies(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyListing);
