import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserSideBar from './User/UserSideBar';
import AdminSideBar from './Admin/AdminSideBar';
import '../css/Admin/ViewCodePage.css';
import '../App.css';

const ViewCode = () => {
  const { historyId } = useParams();
  const [submissionData, setSubmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/status', { withCredentials: true });
        setUserRole(response.data.role);
        console.log(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/view-submission/${historyId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setSubmissionData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching submission data:', error);
        setLoading(false);
      });
  }, [historyId]);

  if (loading) return <p>Loading...</p>;
  if (!submissionData || !submissionData.questionsSubmitted || submissionData.questionsSubmitted.length === 0) return <p>No submissions found.</p>;

  return (
    <div className='main-content'>
      <div className="view-code-container">
        {userRole === 'admin' ? <AdminSideBar /> : <UserSideBar />}
        <h2 className="heading">Submitted Codes for Topic: {submissionData.topicName}</h2>
        {submissionData.questionsSubmitted.map((submission, index) => (
          <div key={index} className="submission-container">
            <div className="details-code-wrapper">
              <div className="details-container">
                <h3>Problem Name: {submission.problemName}</h3>
                <p>Language: {submission.language}</p>
                <p>Filename: {submission.filename}</p>
              </div>
              <div className="code-container">
                <pre className="code-box">{submission.code}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCode;
