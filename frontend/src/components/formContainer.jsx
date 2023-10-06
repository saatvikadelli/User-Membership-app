import { Row, Col, Container } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import './formContainer.css';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='d-flex justify-content-md-center mt-10 align-items-center  '>
        <Col xs={12} md={6} className='card p-5' id='transparent'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
FormContainer.propTypes = {
    children: PropTypes.node, // You can specify a more specific type if needed
  };
export default FormContainer;
