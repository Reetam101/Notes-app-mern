import MainScreen from "../../components/MainScreen"
import { Card, Form, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from "../../components/Loading"
import Message from "../../components/Message"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction, updateNoteAction } from "../../actions/noteAction"
import axios from "axios"
import gfm from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'



const EditNoteScreen = ({ match, history }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState([])
  const [date, setDate] = useState(null)
  const dispatch = useDispatch()
	const { userInfo } = useSelector(state => state.userLogin)
  
  const noteUpdate = useSelector((state) => state.noteUpdate)
  const { loading, error, success, successMessage } = noteUpdate

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(createNoteAction(title, content, category))
    
  //   if(!title || !content || !category) {
  //     return
  //   }
  //   resetHandler()
  //   history.push('/notes')

  // }

  const resetHandler = () => {
    setTitle("")
    setCategory("")
    setContent("")
  }

  const updateHandler = (e) => {
    e.preventDefault()
    dispatch(updateNoteAction(match.params.id, title, content, category))
    if(!title || !content || !category) return

    resetHandler()
    history.push('/notes')
  }

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        }
      }
      const {data} = await axios.get(`/api/notes/${match.params.id}`, config)

      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.updatedAt)
    }

    fetchData()
  }, [match.params.id, date, userInfo])

  return (
    <MainScreen title='Edit Note'>
      <Card>
        <Card.Header>Edit Note</Card.Header>
        <Card.Body>
          {error && <Message type="danger">{error}</Message>}
          {success && <Message type="success">{successMessage}</Message>}
          <Form onSubmit={updateHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="floatingTextarea">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" 
                as="textarea" 
                placeholder="My note..." 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                rows={4} />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown remarkPlugins={[gfm, remarkGemoji]}>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control type="content" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            <Form.Group as={Row}>
				    <Col xs={12} lg={8} md={6} className="mt-3">
				      <button className="btn btn-info btn-rounded btn-sm" type="submit">Update</button>
				    </Col>
				    <Col xs={12} lg={4} md={6} className="mt-3">
				      <button className="btn btn-outline-warning btn-rounded btn-sm" onClick={resetHandler}>Clear fields</button>
				    </Col>
				    <Col className="mt-3" sm={{ span: 10, offset: 2 }}>
							{loading && <Loading />}
				    </Col>
            </Form.Group>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>

    </MainScreen>
  )
}

export default EditNoteScreen