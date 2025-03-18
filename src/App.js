import React, { useState } from 'react';
import axios from 'axios';

function ComplaintForm() {
  const [complaint, setComplaint] = useState('');
  const [findings, setFindings] = useState('');
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState('');

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach(file => formData.append('files', file));
    const res = await axios.post('/api/upload', formData); // Static Web Apps proxies to Functions
    setFiles(res.data.urls);
  };

  const generateResponse = async () => {
    const res = await axios.post('/api/generate', { complaint, findings });
    setResponse(res.data.response);
  };

  const saveResponse = async () => {
    await axios.post('/api/save', { complaint, findings, response, fileUrls: files });
    alert('Saved to Azure SQL!');
  };

  return (
    <div>
      <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Complaint Text" />
      <textarea value={findings} onChange={(e) => setFindings(e.target.value)} placeholder="Findings" />
      <input type="file" multiple onChange={handleFileUpload} />
      <button onClick={generateResponse}>Generate Response</button>
      <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="AI Response" />
      <button onClick={saveResponse}>Save</button>
    </div>
  );
}

export default ComplaintForm;
