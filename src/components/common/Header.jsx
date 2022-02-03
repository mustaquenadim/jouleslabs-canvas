import React from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import brand_logo from '../../assets/images/brand_logo.png';

const Header = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img alt='jouleslabs_canvas_logo' src={brand_logo} width='30' height='30' className='d-inline-block align-top' /> JoulesLabs Canvas
        </Navbar.Brand>
        <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
          <NavDropdown.Item href='#action/3.1'>Mustaque Nadim</NavDropdown.Item>
          <NavDropdown.Item href='#action/3.2'>My Canvas</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='#action/3.4'>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
