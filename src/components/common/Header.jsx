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
  const loggedInUser = useSelector((state) => state.user.profile);

  initializeLoginFramework();
  const Logout = () => {
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
        {!loggedInUser?.isSignedIn && !location.pathname.includes('/login') && (
          <Button as={Link} to='/login'>
            Sign Up
          </Button>
        )}
        {loggedInUser?.isSignedIn && (
          <NavDropdown
            title={
              <img
                className='thumbnail-image'
                src={loggedInUser?.profile?.payload?.userPhoto}
                alt='user_pic'
              />
            }
          >
            <NavDropdown.Item as={Link} to='/'>
              {loggedInUser?.userName}
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
