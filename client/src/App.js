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
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/create-note" component={CreateNoteScreen} />
        <Route path="/note/:id" component={SingleNoteScreen} />
        <Route path="/edit-note/:id" component={EditNoteScreen} />
        <Route path="/notes" component={Notes} />
      </main>
      <ToastContainer theme="dark"/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
