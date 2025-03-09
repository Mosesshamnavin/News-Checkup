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
import Profile from './Profile';
import NewsCheckedList from './NewsCheckedList';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route element={<Layout />}>
        <Route path="/test" element={<NewsCheck />} />
        <Route path="/news-check" element={<NewsCheck />} />
        <Route path="/news-checked-list" element={<NewsCheckedList />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
