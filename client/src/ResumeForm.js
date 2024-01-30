import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, FormGroup, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';

const ResumeForm = () => {
  const [user_id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [section, setSection] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchAutoFillData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auto-fill/${user_id}`);
        if (response.data.length > 0) {
          setName(response.data[0].name);
          setAddress(response.data[0].address);
          setSection(response.data[0].section);
          setSkills(response.data[0].skills);
          setEducation(response.data[0].education);
          setExperience(response.data[0].experience);
        }
      } catch (error) {
        console.error('Error fetching auto-fill data:', error);
      }
    };

    fetchAutoFillData();
  }, [user_id]);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/submit-resume', { user_id, name, address, section, skills, education, experience }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume. Please try again.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateRandomUserId = () => {
    const randomId = Math.random().toString(36).substring(2, 16);
    setUserId(randomId);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 6, offset: 3 }}>
          {!token ? (
            <Login LogOn={handleLogin} />
          ) : (
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>User ID:</FormLabel>
                <input type="text" value={user_id} onChange={(e) => setUserId(e.target.value)} className="form-control" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Name:</FormLabel>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Address:</FormLabel>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Section:</FormLabel>
                <input type="text" value={section} onChange={(e) => setSection(e.target.value)} className="form-control" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Skills:</FormLabel>
                <input type="text" value={section} onChange={(e) => setSection(e.target.value)} className="form-control" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Education:</FormLabel>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="form-control larger-box" />
              </FormGroup>

              <FormGroup>
                <FormLabel>Experience:</FormLabel>
                <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="form-control larger-box" />
              </FormGroup>

              <FormGroup>
                <Button type="submit" className="btn btn-primary">Submit Resume</Button>
              </FormGroup>

              <FormGroup>
                <Button variant="primary" onClick={handlePrint} className="btn btn-secondary">
                  Print Resume
                </Button>
              </FormGroup>

              <FormGroup>
                <Button onClick={generateRandomUserId} className="btn btn-success">Generate Random ID</Button>
              </FormGroup>
            </form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeForm;
























































































/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [user_id, setUserId] = useState('');
  const [section, setSection] = useState('');
  const [content, setContent] = useState('');

  // Fetch auto-fill data when the component mounts
  useEffect(() => {
    const fetchAutoFillData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auto-fill/${user_id}`);
        if (response.data.length > 0) {
          // Populate form fields with auto-fill data
          setSection(response.data[0].section);
          setContent(response.data[0].content);
        }
      } catch (error) {
        console.error('Error fetching auto-fill data:', error);
      }
    };

    fetchAutoFillData();
  }, [user_id]);

  const generateRandomUserId = () => {
    // Generate a random user ID (example: random string)
    const randomId = Math.random().toString(36).substring(2, 10);
    setUserId(randomId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send the resume data to the backend
    try {
      await axios.post('http://localhost:3001/submit-resume', { user_id, section, content });
      alert('Resume submitted successfully!');
    } catch (error) {
      console.error('Error submitting resume:', error);
      alert('Failed to submit resume. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={user_id} onChange={(e) => setUserId(e.target.value)} />

        <label>Section:</label>
        <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />

        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />

        <button type="submit">Submit Resume</button>
      </form>

      <button onClick={generateRandomUserId}>Generate Random ID</button>
    </div>
  );
};

export default ResumeForm;
*/
