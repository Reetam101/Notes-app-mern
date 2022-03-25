import { Button, Card, Row, Col, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'

import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction } from "../actions/noteAction"
import { MDBBadge } from 'mdb-react-ui-kit'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

const NotesCard = ({ title, content, category, id, createdAt, key }) => {

  const dispatch = useDispatch()

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure ?')) {
      // Delete 
      dispatch(deleteNoteAction(id))

    }
  }

  return (
   
      // <Col key={key}>

      <MDBCard key={key} className="shadow p-3 mb-5 bg-white rounded">
        <MDBCardHeader className="d-flex">

              <span
                style={{
                  flex: 1,
                  cursor: "pointer",
                  fontSize: "25px",
                  alignSelf: "center",
                }}>
                  <MDBCardTitle>{title}</MDBCardTitle>
                
              </span>
              <div>
                <Link to={`note/${id}`} className="btn-outline-primary mx-2 btn-sm text-decoration-none">View</Link>
                
                <Button href={`/edit-note/${id}`} className="btn-success btn-rounded mx-2 btn-sm text-decoration-none">Edit</Button>
                <Button className="btn-danger btn-rounded mx-2 btn-sm"
                  onClick={() => deleteHandler(id)}>Delete</Button>
              </div>
            </MDBCardHeader>

                <MDBCardBody>
                  
                    {category.map(cat => <MDBBadge pill color="info mb-3 mx-1">{cat}</MDBBadge>)}
                  <MDBCardText className="mb-3">
                    
                      <ReactMarkdown remarkPlugins={[gfm, remarkGemoji]}>
                        {content.substring(0, 200)}
                      </ReactMarkdown>
                      {
                        content.length > 100 && (
                          <Link className="text-decoration-none" to={`/note/${id}`}>read more...</Link>
                        )
                      }
                  </MDBCardText>
                    
                    <MDBCardFooter className="text-muted">
                      Created on <cite title="Source Title">{createdAt.substring(0, 10)}</cite>
                    </MDBCardFooter>
                </MDBCardBody>

      </MDBCard>
      // </Col>
  )
}

export default NotesCard