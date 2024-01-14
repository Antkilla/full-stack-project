//add all the import module statements 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ResumeForm = () => {
  const [user_id, setUserId] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [section, setSection] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');


  // Fetch auto-fill data when the component mounts
  useEffect(() => {
    const fetchAutoFillData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/auto-fill/${user_id}`);
        if (response.data.length > 0) {
          // Populate form fields with auto-fill data
          //all will populate a random numbers and letters as a auto fill data
          setName(response.data[0].name);
          setAddress(response.data[0].address);
          setSection(response.data[0].section);
          setEducation(response.data[0].education)
          setExperience(response.data[0].experience);
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
      await axios.post('http://localhost:3001/submit-resume', { user_id, name, address, section, education, experience });
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
    // Generate a random user ID (example: random string)
    const randomId = Math.random().toString(36).substring(2, 16);
    setUserId(randomId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" value={user_id} onChange={(e) => setUserId(e.target.value)} />

        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Section:</label>
        <input type="text" value={section} onChange={(e) => setSection(e.target.value)} />

        <label>Education:</label>
        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="larger-box" />

        <label>Experience:</label>
        <textarea value={experience} onChange={(e) => setExperience(e.target.value)} className="larger-textarea" />

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
