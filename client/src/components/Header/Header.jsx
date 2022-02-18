import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const history = useHistory()

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="brand-link h3" to="">Noted</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="search"
                className="mr-sm-2" 
              />
            </Form>
          </Nav>
          <Nav>
            <Nav.Link>
              <Link className="my-notes-link h5" to="/notes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Reetam Chatterjee" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => {
                localStorage.removeItem("userInfo")
                history.push('/')
              }}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
