import React from "react";
import Reflux from "reflux";

import CompanyCard from "../ReuseableComponents/CompanyCard";
import { Card } from "antd";
import styles from "../Styles/Listing.module.css";

// Reflux components
import CompanyStore from "../Reflux/Stores/CompanyStore";
import CompanyActions from "../Reflux/Actions/CompanyAction";

const { Meta } = Card;

class CompanyListing extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 0,
      size: 20,
    };
    this.store = CompanyStore;
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
      CompanyActions.getcompanies({
        size: size,
        from: from,
      });
      this.setState({ from: from + size });
    }
  }

  render() {
    const { companies, isError, errormsg } = this.state;
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
        {isError ? <p>{errormsg}</p> : <p></p>}
      </div>
    );
  }
}

export default CompanyListing;
