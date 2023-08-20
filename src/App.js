import './App.css';
import { BrowserRouter as Router,Routes,Route,} from 'react-router-dom';
import Home from './Home';
// import Login from './components/Login';
// import StudentProfile from './components/StudentProfile';
import Welcome from './Welcome';
import Lecture from './Lecture';
import Subject from './Subject';
// import AdminHome from './components/AdminHome';
import CreateLecture from './CreateLecture';
import Quiz from './Quiz'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Welcome/>}/>
        {/* <Route exact path='/login' element={<Login />} />
        <Route exact path='/student_profile' element={<StudentProfile/>} /> */}
        <Route exact path='/home' element={<Home/>} />
        {/* { <Route exact path='/admin_home' element={<AdminHome />} /> */}
        <Route exact path='/lecture/:id' element={<Lecture />} />
        {  <Route exact path='/subject/:id' element={<Subject />} />}
        { <Route exact path='/create_lecture' element={<CreateLecture/>} /> } 
        {<Route exact path='/quiz/123' element={<Quiz />} /> }
      </Routes>
    </Router>
  );
}

export default App;
