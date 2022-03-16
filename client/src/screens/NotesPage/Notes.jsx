import { useEffect } from "react"
import { Button, Row, Col } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import MainScreen from "../../components/MainScreen"
import NotesCard from "../../components/NotesCard"
import { useDispatch, useSelector } from 'react-redux'
import { listNotes } from "../../actions/noteAction"
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'

const Notes = () => {
  const dispatch = useDispatch()
  const noteList = useSelector(state => state.noteList)
  const { loading, notes, error } = noteList
  
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin 

  const noteCreate = useSelector(state => state.noteCreate)
  const { success: successCreate } = noteCreate 

  const noteUpdate = useSelector(state => state.noteUpdate)
  const { success: updateSuccess } = noteUpdate 

  const noteDelete = useSelector(state => state.noteDelete)
  const { loading: loadingDelete, error: deleteError, success: deleteSuccess } = noteDelete 
  
  const history = useHistory()

  useEffect(() => {
    dispatch(listNotes())
    if(!userInfo) {
      history.push('/')
    }

  }, [dispatch, successCreate, history, userInfo, updateSuccess, deleteSuccess]) 


  return (
      <MainScreen title={`Welcome back ${userInfo.name}!`}>
        <Link to="create-note">
          <Button className="btn-info btn-rounded mb-5" size="sm">
            Create New Note
          </Button>
        </Link>
        { deleteError && (
          <ErrorMessage type="danger">{deleteError}</ErrorMessage>
        ) }
        {loadingDelete && <Loading />}
        {error && <ErrorMessage />}
        {loading && <Loading />}
        <Row>
          {
            notes?.sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt))).map(note => (
              <Col sm={6} xs={12}>
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
  )
}

export default Notes