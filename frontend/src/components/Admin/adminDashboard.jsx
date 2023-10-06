
import { Table, Spinner,Button  } from 'react-bootstrap';
import { useGetMembersQuery,useDeleteUserMutation } from '../../Slices/userApiSlice.js'; // Update the import path
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

//import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './adminDashboard.css';


const AdminDashboard = () => {
  const { data, isLoading, } = useGetMembersQuery(); 
  // Use the useGetMembersQuery hook to fetch members data
  //const dispatch = useDispatch();
  //const navigate = useNavigate();

  const [deleteUserMutation] = useDeleteUserMutation();

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserMutation(userId);
      toast.success("User Deleted successfully");
      
      setTimeout(() => {
        window.location.reload();
      },3000);
      

      } catch (error) {
      // Handle network or other errors
      console.error('Error deleting user:', error);
    }
  };



  return (
    <div>
      <h2 style={{ marginBottom: '20px'}} className='head'>Admin Dashboard</h2>

      <Link to="/add">
        <Button variant="primary" style={{ marginBottom: '20px'}} id='button'>Add User</Button>
      </Link>

      {isLoading && <Spinner animation="border" />}

      

      {data && data.length > 0 && (
        
        <Table striped bordered hover id='table'>
          <thead>
            <tr id='table'>
              {/* Add table headers as needed */}
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody id='table'>
            {data.map((member) => (
              <tr key={member._id}>
                {/* Populate the table cells with member data */}
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                
                {/* Add more table cells for other member properties */}
                <td className='align-items-center'>
                  <Button variant='info' onClick={() => handleDeleteUser(member._id)} style={{marginRight:'20px'}} >Delete</Button>

                  <LinkContainer to ={`/edit/${member._id}`}>
                    <Button variant ='info ' > Edit</Button>
                  </LinkContainer>

                  
                    

                  

                    
                    
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      
    </div>
  );
};

export default AdminDashboard;
