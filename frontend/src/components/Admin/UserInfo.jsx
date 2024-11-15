import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../css/Admin/UserInfo.css';
import '../../App.css';

const UserInfo = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [attended, setAttended] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:5000/users-info/${userId}`);
                setUser(userResponse.data);
            } catch (error) {
                setError('Error fetching user data');
            }
        };

        const fetchTestHistory = async () => {
            try {
                const historyResponse = await axios.get(`http://localhost:5000/performance/${userId}`);
                setAttended(historyResponse.data.attended);
                setCompleted(historyResponse.data.completed);
            } catch (error) {
                setError('Error fetching test history');
            }
        };

        Promise.all([fetchUserData(), fetchTestHistory()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [userId]);

    const handleViewAttended = () => {
        navigate(`/user-attended-tests/${userId}`);
    };

    const handleViewCompleted = () => {
        navigate(`/user-completed-tests/${userId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="main-content">
            <div className="user-info-content">
                <h1>User Info</h1>
                {user ? (
                    <div className='user-info-container'>
                        <p><strong>Name:</strong> {user.displayName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Roll Number:</strong> {user.rollNo}</p>
                        <p><strong>Department:</strong> {user.department}</p>
                    </div>
                ) : (
                    <p>No user data available</p>
                )}
            </div>

            {/* Test Stats Section Outside User Info Content */}
            <div className="test-stats-container">
                <h3>Test Stats</h3>

                <div className="test-boxes">
                    <div className="test-box" onClick={handleViewAttended}>
                        <p><strong>Tests Attended:</strong> {attended}</p>
                    </div>
                    <div className="test-box" onClick={handleViewCompleted}>
                        <p><strong>Tests Completed:</strong> {completed}</p>
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default UserInfo;
