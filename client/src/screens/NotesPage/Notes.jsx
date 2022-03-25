import { useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import MainScreen from "../../components/MainScreen"
import NotesCard from "../../components/NotesCard"
import { useDispatch, useSelector } from 'react-redux'
import { listNotes } from "../../actions/noteAction"
import Loading from '../../components/Loading'
import Message from '../../components/Message'
import Categories from "../../components/Categories"

const Notes = ({ search }) => {
  const dispatch = useDispatch()
  const noteList = useSelector(state => state.noteList)
  const { loading, notes, error } = noteList
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, success: loginSuccess } = userLogin 
  
  const noteCreate = useSelector(state => state.noteCreate)
  const { success: successCreate } = noteCreate 
  
  const noteUpdate = useSelector(state => state.noteUpdate)
  const { success: updateSuccess } = noteUpdate 
  
  const noteDelete = useSelector(state => state.noteDelete)
  const { loading: loadingDelete, error: deleteError, success: deleteSuccess } = noteDelete 
  
  const history = useHistory()
  
  useEffect(() => {
    if(!userInfo) {
      history.push('/')
    }
    else {
      dispatch(listNotes())
    }

  }, [dispatch, successCreate, history, userInfo, updateSuccess, deleteSuccess]) 


  return (
    <>
      <MainScreen title={`Welcome back ${userInfo?.name}!`}>
        {/* <Categories /> */}
        <Link to="create-note">
          <Button className="btn-info btn-rounded mb-5" size="sm">
            Create New Note
          </Button>
        </Link>
        {loginSuccess && <Message type="success">{loginSuccess}</Message>}
			  {deleteSuccess && <Message type="success">Note Deleted successfully!</Message>}
        { deleteError && (
          <Message type="danger">{deleteError}</Message>
        ) }
        {successCreate && <Message type="success">Note created successfully!</Message>}
        {updateSuccess && <Message type="success">Note updated successfully!</Message>}
        {loadingDelete && <Loading />}
        {error && <Message type="danger">{error}</Message>}
        {loading && <Loading />}
        <Row>
          {
            notes?.filter(filteredNote => (
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map(note => (
              <Col sm={12} xs={12} md={6}>
                <NotesCard 
                  title={note.title} 
                  content={note.content} 
                  category={note.category} 
                  key={note._id} 
                  id={note._id}
                  createdAt={note.createdAt} />
              </Col>
            ))
          }

        </Row>
      </MainScreen>
      </>
    )
}

export default Notes