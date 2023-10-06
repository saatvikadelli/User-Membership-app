import { Container } from "react-bootstrap";
import Header from "./components/header";

import { Outlet} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const App =() =>{
  return(
    <div>
      <Header />
      <ToastContainer />
      <Container className='my-2'>
        <Outlet />
      </Container>
    </div>
  )
}

export default App;