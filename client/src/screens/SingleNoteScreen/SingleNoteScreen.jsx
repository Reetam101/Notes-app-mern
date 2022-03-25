import MainScreen from "../../components/MainScreen"
import { Card, Form, Col, Row, Button } from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from "../../components/Loading"
import Message from "../../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction, deleteNoteAction } from "../../actions/noteAction"
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import gfm from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'

import html2pdf from 'html2pdf.js'
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit"

const SingleNoteScreen = ({ match, history }) => {
  console.log(match)
  const dispatch = useDispatch()
  // const noteElement = useRef()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState([])
  const [date, setDate] = useState("")
	const { loading, error, success } = useSelector(state => state.noteCreate)
	const { userInfo } = useSelector(state => state.userLogin)


  function createPDF () {
    const myElement = document.getElementById('myElement')
    html2pdf(myElement);
  }
  

  useEffect(() => {
    const getData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
      const { data } = await axios.get(`/api/notes/${match.params.id}`, config)

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.createdAt)
    }
    // const userInfo = localStorage.getItem("userInfo")

    if(!userInfo) {
      history.push("/")
    } else {
      getData()
    }
  }, [match.params.id, userInfo, history])

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure ?')) {
      // Delete 
      dispatch(deleteNoteAction(id))
      history.push("/notes")
    }
  }
 

  return (
    <MainScreen title='View Note'>
      <MDBCard className="mt-3 border-primary shadow" id={'myElement'}>
          <MDBCardHeader>
            <MDBCardTitle>{title}</MDBCardTitle>
            <div>
                <Button href={`/edit-note/${match.params.id}`} className="btn-success btn-rounded mx-2 btn-sm text-decoration-none">Edit</Button>
                <Button className="btn-danger btn-rounded mx-2 btn-sm"
                  onClick={() => deleteHandler(match.params.id)}>Delete</Button>
              </div>
          </MDBCardHeader>
          <MDBCardBody>
            {error && <Message type="danger">{error}</Message>}
            {category.map(cat => <MDBBadge pill color="info mb-3 mx-1">{cat}</MDBBadge>)}
            <MDBCardText >
              <ReactMarkdown remarkPlugins={[gfm, remarkGemoji]}>{content}</ReactMarkdown>
            </MDBCardText>
          </MDBCardBody>
          <MDBCardFooter className="text-muted">
            Created on - {date.substring(0, 10)}
          </MDBCardFooter>
      </MDBCard>
      <button onClick={createPDF} className="btn btn-primary mt-3 btn-md">Export as PDF</button>
    </MainScreen>
  )
}

export default SingleNoteScreen