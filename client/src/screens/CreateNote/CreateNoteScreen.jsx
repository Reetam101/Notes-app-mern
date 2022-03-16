import MainScreen from "../../components/MainScreen"
import { Card, Form, Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction } from "../../actions/noteAction"
import { useHistory } from 'react-router-dom'
import gfm from 'remark-gfm'
import {toast} from 'react-toastify'

const CreateNoteScreen = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const history = useHistory()
  const dispatch = useDispatch()
	const { loading, error, success } = useSelector(state => state.noteCreate)


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNoteAction(title, content, category))
    
    if(!title || !content || !category) {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      return
    }
    resetHandler()
    history.push('/notes')
    toast.success('Note created!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

    })

  }

  const resetHandler = () => {
    setTitle("")
    setCategory("")
    setContent("")
  }

  return (
    <MainScreen title='Create Note'>
      <Card>
        <Card.Header>Create a New Note</Card.Header>
        <Card.Body>
          {/* {error && <ErrorMessage type="danger">{error}</ErrorMessage>} */}
          <Form onSubmit={handleSubmit}>
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
                  <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control type="content" placeholder="Enter Category" data-role="tagsinput" value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            <Form.Group as={Row}>
				    <Col xs={12} lg={8} md={6} className="mt-3">
				      <button className="btn btn-info btn-rounded btn-sm" type="submit">Create</button>
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

export default CreateNoteScreen