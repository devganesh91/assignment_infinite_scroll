import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "../../../assignment_infinite_scroll/node_modules/antd";

const { Meta } = Card;

const CompanyCard = ({
  name,
  description = "No Description Provied",
  logos,
  domain,
  tracxnUrl
}) => {
  const logoImg = logos && logos.medium;
  return (
    <Card
      style={{ width: "600px" }}
      hoverable
      cover={
        <img
          alt="ProgileImg"
          src={logoImg}
          style={{ width: "80px", height: "80px", borderRadius: "7px" }}
        />
      }
      actions={[
        <a href={`https://${domain}`} rel="noopener noreferrer" target="_blank">
          <Button type="primary" shape="round" size="large">
            Visit Company Domain
          </Button>
        </a>,
        <a href={tracxnUrl} rel="noopener noreferrer" target="_blank">
          <Button type="primary" shape="round" size="large">
            Visit Tracxn URL
          </Button>
        </a>,
      ]}
    >
      <Meta title={name} description={description.short} />
      <div style={{marginTop: '20px'}}>
        <h5>Domain - {domain}</h5>
        <h5>Tracxn URL - {tracxnUrl}</h5>
      </div>
    </Card>
  );
};

CompanyCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.object,
  logos: PropTypes.object,
  tracxnUrl: PropTypes.string,
  domain: PropTypes.string,
};

export default CompanyCard;
