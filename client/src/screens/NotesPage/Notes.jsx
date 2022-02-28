import { useEffect } from "react"
import { Button } from "react-bootstrap"
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
  
  const history = useHistory()

  useEffect(() => {
    dispatch(listNotes())
    if(!userInfo) {
      history.push('/')
    }
  }, [dispatch]) 


  return (
      <MainScreen title={`Welcome back ${userInfo.name}!`}>
        <Link to="create-note">
          <Button className="btn-info btn-rounded" size="sm">
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage />}
        {loading && <Loading />}
        {
          notes?.map(note => (
            <NotesCard 
              title={note.title} 
              content={note.content} 
              category={note.category} 
              key={note._id} 
              id={note._id}
              createdAt={note.createdAt} />
          ))
        }
      </MainScreen>
  )
}

export default Notes