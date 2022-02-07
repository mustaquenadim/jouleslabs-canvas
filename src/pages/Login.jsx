import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

// stylesheet
import '../styles/login/login.scss';
import {
  createUserWithEmailAndPassword,
  handleFacebookSignIn,
  handleGitHubSignIn,
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailAndPassword,
} from '../components/login/LoginManager';

// redux
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../redux/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const { register, handleSubmit, errors, reset } = useForm();

  const [user, setUser] = useState({
    isSignedIn: false,
    userName: '',
    email: '',
    userPhoto: '',
  });
  // setLoggedInUser(user);
  dispatch(setLoggedInUser(user));

  initializeLoginFramework();

  // create user & sign in with -> Google
  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      setUser(res);
      // history.replace(from);
    });
  };

  // create user & sign in with -> Facebook
  const facebookSignIn = () => {
    handleFacebookSignIn().then((res) => {
      setUser(res);
      // history.replace(from);
    });
  };

  // create user & sign in with -> GitHub
  const GitHubSignIn = () => {
    handleGitHubSignIn().then((res) => {
      setUser(res);
      // history.replace(from);
    });
  };

  // create user & sign in with -> email and password
  const onSubmit = (data) => {
    const { name, email, password } = data;

    if (newUser && name && email && password) {
      createUserWithEmailAndPassword(name, email, password).then((res) => {
        res.userName = name;
        setUser(res);
        navigate(from);
      });
    }

    if (!newUser && email && password) {
      signInWithEmailAndPassword(email, password).then((res) => {
        setUser(res);
        navigate(from);
      });
    }
    reset({});
  };

  return (
    <div className='login-contain'>
      <div
        className={newUser ? 'login-container right-panel-active' : 'login-container'}
        id='container'
      >
        <div
          className={
            newUser ? 'form-container sign-up-container' : 'form-container sign-in-container'
          }
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{newUser ? 'Create Account' : 'Sign in'}</h1>
            <div className='social-container'>
              <a onClick={facebookSignIn} className='social'>
                <FaFacebookF />
              </a>
              <a onClick={googleSignIn} className='social'>
                <FaGoogle />
              </a>
              <a onClick={GitHubSignIn} className='social'>
                <FaGithub />
              </a>
            </div>
            <span>{newUser ? 'or use your email for registration' : 'or use your account'}</span>
            {newUser && (
              <input
                name='name'
                type='text'
                ref={register({ required: true })}
                placeholder='Name'
                required
              />
            )}
            <input
              name='email'
              type='email'
              ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
              placeholder='Email'
              required
            />
            <input
              name='password'
              type='password'
              ref={register({ required: true })}
              placeholder='Password'
              required
            />
            {!newUser && <a>Forgot your password?</a>}
            <button type='submit'>{newUser ? 'Sign Up' : 'Sign In'}</button>
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className='ghost' id='signIn' onClick={() => setNewUser(false)}>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className='ghost' id='signUp' onClick={() => setNewUser(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
