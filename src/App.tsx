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
import PrivateRoute from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Profile from './Profile';
import NewsCheckedList from './NewsCheckedList';
// import ProfilePage from './components/ProfilePage';
// import AdminPage from './components/AdminPage';


function App() {
  return (
    <Router>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoutes element={<Home />} />} />
        <Route path="/home" element={<PublicRoutes element={<Home />} />} />
        <Route path="/register" element={ <PublicRoutes element={<RegistrationForm />} />} />

        {/* Private Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/news-check" element={<PrivateRoute element={<NewsCheck />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          <Route path="/news-list" element={<PrivateRoute element={<NewsCheckedList />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
