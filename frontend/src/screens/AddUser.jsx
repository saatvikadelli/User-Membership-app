import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { useAddMemberMutation } from '../Slices/userApiSlice';
import Loader from '../components/Loader';
import './AddUser.css';
const AddUserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');

  //const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddMemberMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await addUser({
          name,
          email,
          password,
          phone,
        }).unwrap();
        console.log(res);
        toast.success('User added successfully');
        // Optionally, you can redirect to another page or stay on this page
        // navigate('/admin-dashboard'); // Redirect to admin dashboard
        // Clear the form fields after successful user addition
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div id='addUser'>
      <FormContainer>
        <h1>Add User</h1>

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
            Add User
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AddUserScreen;
