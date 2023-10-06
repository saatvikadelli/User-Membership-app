import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../Slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import './registerScreen.css';


const isPhoneNumberValid = (phoneNumber) => {
  // Regex pattern for a 10-digit phone number (numeric only)
  const phoneNumberPattern = /^\d{10}$/;
  return phoneNumberPattern.test(phoneNumber);
};

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/profile');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isPhoneNumberValid(phone)) {
      toast.error('Invalid phone number. Please enter a 10-digit number.');
      return;
    }


    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, phone }).unwrap();
        dispatch(setCredentials({ ...res }))
        navigate('/profile');
      } catch (err) {
        toast.error(err?.data?.message || "An error occured");
      }
    }
  };

  return (
    <div id="registerContainer" className='d-flex justify-content-center align-items-center h-100' >
      <div id="signup-container"  >
        <FormContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label  className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Name</Form.Label>
              <Form.Control
                
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label  className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Email Address</Form.Label>
              <Form.Control
                
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label  className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Password</Form.Label>
              <Form.Control
                type='password'
                
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='confirmPassword'>
              <Form.Label  className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='Phone'>
              <Form.Label  className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Phone Number</Form.Label>
              <Form.Control
                type='text'
                
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>



            {isLoading && <Loader />}

            <Button type='submit' variant='primary' className='mt-3' id='button'>
              Sign Up
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              Already have an account? <Link to={`/login`}>Login</Link>
            </Col>
          </Row>
        </FormContainer>
      </div>
    </div>
  );
};

export default RegisterScreen;