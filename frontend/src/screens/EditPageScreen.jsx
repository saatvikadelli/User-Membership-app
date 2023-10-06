import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useParams } from 'react-router-dom';
import { getUser } from '../service/Axiosapi';
import { useUpdateSpecificMemberMutation, useToggleSuspensionMutation } from '../Slices/userApiSlice';
//import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './EditPageScreen.css';



const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [isSuspended, setIsSuspended] = useState('');
    

    const { id } = useParams();
    const [updateUser] = useUpdateSpecificMemberMutation();
    const [toggleSuspension] = useToggleSuspensionMutation();
    

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async () => {
        try {
            const response = await getUser(id);
            const userData = response.data.user;

            console.log('user data: ', userData);

            setName(userData.name);

            setEmail(userData.email);
            setPhoneNumber(userData.phone);
            setIsSuspended(userData.isSuspended);

        } catch (error) {
            console.error('Error loading user details:', error);
        }
    };





    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');

        } else {
            try {
                await updateUser({ id, data: { name, phone, email,password } })
                toast.success("Member has been updated successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }
    };

    const handleToggle = async () => {
        try {
            await toggleSuspension({ id, data: { name, phone, email } });
            if(!isSuspended){
                toast.success("Member has been suspended!!");
            } else {
                toast.success("Member has been Unsuspended!!");
            }
            setIsSuspended(!isSuspended);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }


    }



    return (
        <div id='editUser'>
            <FormContainer>
                <h1>Edit User</h1>
                <Form onSubmit={handleSubmit}>
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


                    <Button type='submit' variant='primary' id='button' className='me-2' >
                        Update Profile
                    </Button>



                    <Button variant={isSuspended?'success':'danger'} onClick={handleToggle}>
                        {isSuspended ? 'Unsuspend Member': 'Suspend Member'}
                        
                    </Button>

                </Form>
            </FormContainer>
        </div>
    );
};

export default EditUser;
