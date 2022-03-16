import {
  MDBFooter,
  MDBContainer
} from 'mdb-react-ui-kit';

import { Github } from 'react-bootstrap-icons'

const Footer = () => {
  return (
    <MDBFooter className='bg-black text-center' style={{color: 'white'}}>
    <MDBContainer className='p-2 pb-0'>
      <section className='mb-4'>
        <a className='btn btn-floating' href='https://github.com/Reetam101' role='button'>
          <Github size='30px' />
        </a>
      </section>
    </MDBContainer>

    <div className='text-center p-1' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      © 2022 Copyright:
      <a className='text-white text-decoration-none' href='https://github.com/Reetam101'>
          Reetam101
      </a>
    </div>
  </MDBFooter>
    // <div>
    //   <footer
    //     style={{
    //       width: "100%",
    //       position: "relative",
    //       bottom: 0,
    //       display: "flex",
    //       justifyContent: "center"
    //     }}
    //   >
    //     <Container>
    //       <Row>
    //         <Col className="text-center py-3">Copyright &copy; Noted</Col>
    //       </Row>
    //     </Container>
    //   </footer>
    // </div>  
  );
};

export default Footer;
