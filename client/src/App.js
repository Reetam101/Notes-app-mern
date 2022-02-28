import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNoteScreen from './screens/CreateNote/CreateNoteScreen'
import Notes from './screens/NotesPage/Notes';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom'; 

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/create-note" component={CreateNoteScreen} />
        <Route path="/notes" component={Notes} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
