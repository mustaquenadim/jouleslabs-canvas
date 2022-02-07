import React from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import brand_logo from '../../assets/images/brand_logo.png';
import { setLoggedInUser } from '../../redux/slice/authSlice';
import { handleSignOut, initializeLoginFramework } from '../login/LoginManager';

const Header = () => {
  // const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  initializeLoginFramework();
  const Logout = () => {
    console.log('I am logged out!');
    handleSignOut().then((res) => {
      setLoggedInUser(res);
    });
  };
  return (
    <Navbar bg='light' expand='lg' sticky='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img
            alt='jouleslabs_canvas_logo'
            src={brand_logo}
            width='30'
            height='30'
            className='d-inline-block align-top'
          />{' '}
          JoulesLabs Canvas
        </Navbar.Brand>
        <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
          <NavDropdown.Item as={Link} to='/'>
            Mustaque Nadim
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to='/'>
            My Canvas
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
