import { useEffect, useState } from "react"
import { Button, Card, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import MainScreen from "../../components/MainScreen"
import NotesCard from "../../components/NotesCard"
import axios from 'axios'

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('/api/notes')
        setNotes(res.data);
      } catch(err) {
        console.log(err);
      }
    }

    fetchNotes();
  }, [])

  return (
      <MainScreen title="Welcome back Reetam!">
        <Link to="create-note">
          <Button className="btn-info btn-rounded" size="sm">
            Create New Note
          </Button>
        </Link>
        {
          notes.map(note => (
            <NotesCard title={note.title} content={note.content} category={note.category} key={note._id} id={note._id} />
          ))
        }
      </MainScreen>
  )
}

export default Notes