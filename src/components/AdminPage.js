import React from "react";
import { Container, Row, Col, Form, Button, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPage.css"; // Add custom styles if needed
import axios from 'axios';

function AdminPage() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    article : ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to the homepage
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/fact-check', formData);
      console.log(response);
      setMessage(response)
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin">Dashboard</Link></li>
          <li><Link to="/edit-website">Edit Website</Link></li>
          <li><Link to="/write-news">Write News</Link></li>
          <li><Link to="/ads">Ads</Link></li>
          <li><Link to="/manage-users">Manage Users</Link></li>
          <li><Link to="/hostinger">Hostinger</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar bg="light" expand="lg" className="admin-navbar">
          <Container>
            <Navbar.Brand>My Account</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link onClick={handleLogout} className="logout">Log Out</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* News Form Section */}
        <Container className="news-section">
          <h3>Write Some News</h3>

          <div className="news-form">
            <h4>Write a Post</h4>
            <Form>
              {/* <Form.Group className="mb-3">
                <Form.Label>News Title:</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group> */}

              <Form.Group className="mb-3">
                <Form.Label>Content:</Form.Label>
                <Form.Control name="article" as="textarea" onChange={handleChange}  on rows={5} placeholder="Write content here..." />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default AdminPage;
