import React, { useState } from 'react';
import axios from 'axios'

const ResumeForm = () => {
    const [user_id, setUserId] = useState('');
    const [section, setSection] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:3001/submit-resume', { user_id,  section, content });
            alert('Resume has been submitted successfully!');
        }   catch (error) {
            console.error('Error submitting resume', error);
            alert('Failed to submit resume. Please try again.');
        }

    };

    return (
        <form onSubmit = {handleSubmit}>
            






        </form>
    )



}
