import { Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from '../../actions/userActions'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
    history.push("/")
  }

  return (
    <Navbar className="navbar-dark bg-primary" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="brand-link navbar-brand" to="">Noted</Link>
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
              <Link className="my-notes-link" to="/notes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title="Reetam Chatterjee" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
