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

// import ProfilePage from './components/ProfilePage';
// import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route element={<Layout />}>
          <Route path="/news-check" element={<NewsCheck />} />
          <Route path="/test" element={<NewsCheck />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
