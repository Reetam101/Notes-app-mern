import { Button, Col, Container, Row } from "react-bootstrap";
import "./LandingPage.css"
import { useEffect } from 'react'
import { Journal } from "react-bootstrap-icons";

const LandingPage = () => {
  //useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo")

  //   if(userInfo) {
  //     history.push("/notes")
  //   }
  // }, [history])

  return (
    <Container>
      <div className="main">
        <h1>Welcome to Noted!
        <Journal size="80px" />
        </h1>
        <h6 className="landing-text">The one and only best place to take notes!</h6>
        <br />
        <br />
        <br />
        <Container className="p-5 border border-dark rounded">
          <Row className="d-flex flex-column justify-content-center">
            <Col className="d-flex justify-content-center mx-2">
              <p>Already have an account?  </p>
              <a href="/login">
                <strong className="alert-link">Login</strong>
              </a>
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center">
              <p>Create a new account ?  </p>
              <a href="/register">
                <button className="btn btn-info btn-rounded">Register</button>
              </a>
            </Col>

          </Row>
        </Container>
      </div>
    </Container>

  ) 
}

export default LandingPage
