import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <footer
        style={{
          width: "100%",
          position: "relative",
          bottom: 0,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Container>
          <Row>
            <Col className="text-center py-3">Copyright &copy; Noted</Col>
          </Row>
        </Container>
      </footer>
    </div>  
  );
};

export default Footer;
