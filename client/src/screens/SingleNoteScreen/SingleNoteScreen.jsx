import MainScreen from "../../components/MainScreen"
import { Card, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction } from "../../actions/noteAction"
import { useHistory } from 'react-router-dom'
import axios from "axios"
import gfm from 'remark-gfm'
import { MDBBadge, MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardText, MDBCardTitle } from "mdb-react-ui-kit"


const SingleNoteScreen = ({ match }) => {
  console.log(match)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
	const { loading, error, success } = useSelector(state => state.noteCreate)
	const { userInfo } = useSelector(state => state.userLogin)

  
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

    getData()
  }, [match.params.id, userInfo])
 

  return (
    <MainScreen title='View Note'>
      <MDBCard className="mt-3 border-primary shadow">
        <MDBCardHeader>
          <MDBCardTitle>{title}</MDBCardTitle>
        </MDBCardHeader>
        <MDBCardBody>
          {error && <ErrorMessage type="danger">{error}</ErrorMessage>}
          <MDBBadge className="mb-3" pill color="success">
            {category}
          </MDBBadge>
          <MDBCardText >
            <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter className="text-muted">
          Created on - {date.substring(0, 10)}
        </MDBCardFooter>
      </MDBCard>

    </MainScreen>
  )
}

export default SingleNoteScreen