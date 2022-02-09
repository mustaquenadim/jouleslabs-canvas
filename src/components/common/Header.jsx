import React from 'react';
import { Button, Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import brand_logo from '../../assets/images/brand_logo.png';
import { setLoggedInUser } from '../../redux/slice/authSlice';
import { handleSignOut, initializeLoginFramework } from '../login/LoginManager';

// stylesheet
import '../../styles/common/header.scss';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  initializeLoginFramework();
  const Logout = () => {
    console.log('I am logged out!');
    handleSignOut().then((res) => {
      dispatch(setLoggedInUser(res));
    });
  };
  return (
    <Navbar expand='lg' fixed='top'>
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
        {!user.isAuthenticated && !location.pathname.includes('/login') && (
          <Button as={Link} to='/login'>
            Sign Up
          </Button>
        )}
        {user.isAuthenticated && (
          <NavDropdown
            title={
              <img
                className='thumbnail-image'
                src={user?.profile?.payload?.userPhoto}
                alt='user_pic'
              />
            }
          >
            <NavDropdown.Item as={Link} to='/'>
              {user?.profile?.payload?.userName}
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/'>
              My Canvases
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
