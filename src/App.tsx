import './globals.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './Home';
import RegistrationForm from './RegistrationForm';
import Layout from './Layout';
import NewsCheck from './NewsCheck';
<<<<<<< HEAD

// import ProfilePage from './components/ProfilePage';
// import AdminPage from './components/AdminPage';
=======
import Profile from './Profile';
import NewsCheckedList from './NewsCheckedList';


>>>>>>> added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
<<<<<<< HEAD
        <Route path="/register" element={<RegistrationForm />} />
        <Route element={<Layout />}>
          <Route path="/news-check" element={<NewsCheck />} />
          <Route path="/test" element={<NewsCheck />} />
=======
        <Route element={<Layout />}>
        <Route path="/test" element={<NewsCheck />} />
        <Route path="/news-check" element={<NewsCheck />} />
        <Route path="/news-checked-list" element={<NewsCheckedList />} />
        <Route path="/profile" element={<Profile />} />
>>>>>>> added
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
