import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const yearMark = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Buildable-Buddies Webstore &copy; {yearMark}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
