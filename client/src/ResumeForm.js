// src/components/ResumeForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'; // Assuming you're using Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

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

  const handlePrint = () => {
    window.print();
  };

  const generateRandomUserId = () => {
    //Generate a random user ID (example: random string)
    const randomId = Math.random().toString(36).substring(2, 10);
    setUserId(randomId);
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
      
      {/* Print button */}
      <Button variant="primary" onClick={handlePrint}>
        Print Resume
      </Button>
      
    </div>
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
