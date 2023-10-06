import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.jsx';
import { useLoginMutation } from '../Slices/userApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';


import './LoginScreen.css';
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);


  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.role);
      //check if user is admin
      if (userInfo.role === 1) {
        console.log('Admin User Detected. Redirecting to /admin/users'); //redirect to /admin/users
        navigate('/members');
        return () => {
          console.log("unmount");
        }

      } else if (userInfo.role === 0 && userInfo.isSuspended === false) {
        console.log('Regular User Detected. Redirecting to /profi');
        navigate('/profile');

      } else {
        console.log('User Suspended or Not Registered.');
      }
    }

  }, [navigate, userInfo]);





  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);

      dispatch(setCredentials({ ...res }))

      //user role check
      if (res.role === 1) {
        console.log('Res Admin User Detected. Redirecting to /admin/users');
        navigate('/members');
      } else if (res.role === 0 && res.isSuspended === false) {
        console.log('  Res Regular User Detected. Redirecting to /profile');
        navigate('/profile')
      } else {
        console.log('User Suspended or Not Registered.');
        toast.error("Your account is suspended , please renew membership")
      }


    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "An error occured");
    }
  };

  return (






    <div  id="containerMain">
      <div id="form-size-panel" className="d-flex justify-content-center align-items-center h-100" >
        <div className="d-flex justify-content-center align-items-center">
          <div id='image' className='mt-2'>
            <img src="https://doodleipsum.com/429x425/flat?bg=7463D9&i=ca2314396afed76441fb67a45df7649d" alt="Running by Ana Copenicker" ></img>

          </div>
          <FormContainer id="form-container" className='p-2'>
            <h1 >Sign In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group className="pl-2 " controlId="email">
                <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}} >Email Address</Form.Label>
                <Form.Control
                  
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Password</Form.Label>
                <Form.Control
                  
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {isLoading && <Loader />}

              <Button type="submit" id="button" variant="primary" className="mt-3">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer? <Link to="/register">Register</Link>
              </Col>
            </Row>
          </FormContainer>
        </div>
      </div>
    </div>




  );
};

export default LoginScreen;