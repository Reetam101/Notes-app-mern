import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNoteScreen from './screens/CreateNote/CreateNoteScreen'
import Notes from './screens/NotesPage/Notes';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'; 
import SingleNoteScreen from './screens/SingleNoteScreen/SingleNoteScreen';
import EditNoteScreen from './screens/EditNoteScreen/EditNoteScreen';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

function App() {
  const [search, setSearch] = useState("")

  return (
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/create-note" component={CreateNoteScreen} />
        <Route path="/note/:id" component={SingleNoteScreen} />
        <Route path="/edit-note/:id" component={EditNoteScreen} />
        <Route path="/notes" component={() => <Notes search={search}/>} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
