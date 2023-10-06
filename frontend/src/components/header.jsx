
import { Navbar, Nav, Container, NavDropdown,} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../Slices/userApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  
//not making async calls we use dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>User Membership App</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <div>
                  <NavDropdown title ={userInfo.name} id ='username'>
                    {userInfo.role === 1 &&(
                    <LinkContainer to='/members'>
                      <NavDropdown.Item>All Users</NavDropdown.Item>
                    </LinkContainer>
                    )}
                    
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    
                    <NavDropdown.Item onClick={logoutHandler}>
                      logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <div>
                <LinkContainer to='/login'>
                <Nav.Link >
                    <FaSignInAlt /> Sign In
                </Nav.Link>
                </LinkContainer>
                <LinkContainer to= '/register'>
                <Nav.Link >
                    <FaSignOutAlt /> Sign Up
                </Nav.Link>
                </LinkContainer>
                </div>
              ) }
                
            
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;