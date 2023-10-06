import { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Form, Button, } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '../Slices/userApiSlice';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import './profileScreen.css';
const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');

  //const navigate = useNavigate();
  const dispatch = useDispatch();



  const userInfo = useSelector((state) => state.auth.userInfo);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phone);

  }, [userInfo.setName, userInfo.setEmail, userInfo.setPhoneNumber]);
  console.log(userInfo);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          phone,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated ')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div id='profile'>
      <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Name</Form.Label>
            <Form.Control
              type='name'
              
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Email Address</Form.Label>
            <Form.Control
              type='email'
              
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='password'>
            <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Password</Form.Label>
            <Form.Control
              type='password'
              
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='confirmPassword'>
            <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='phoneNumber'>
            <Form.Label className='text-dark fw-bold' style={{fontFamily:'sans-serif'}}>Phone Number</Form.Label>
            <Form.Control
              type='text'
              
              placeholder='Phone Number'
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {isLoading && <Loader />}

          <Button type='submit' variant='primary' className='mt-3' id='button'>
            Update
          </Button>
        </Form>


      </FormContainer>
    </div>
  );
};

export default ProfileScreen;