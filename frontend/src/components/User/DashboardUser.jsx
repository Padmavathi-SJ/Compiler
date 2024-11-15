import React, { useEffect, useState } from 'react';
import UserSideBar from '../User/UserSideBar';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import '../../css/User/DashboardUser.css';

const Dashboard = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({ username: '', rollNo: '' });
  const [upcomingTests, setUpcomingTests] = useState([]); 
  const [attendedTests, setAttendedTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user-details/${userId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo({ username: data.username, rollNo: data.rollNo });
      })
      .catch((error) => console.error('Error fetching user details:', error));

    fetch(`http://localhost:5000/tests-details/${userId}`, { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        setUpcomingTests(data.upcoming || []);
        setAttendedTests(data.attended || []);
        setCompletedTests(data.completed || []);
      })
      .catch((error) => console.error('Error fetching tests:', error));
  }, [userId]);

  // Navigate to individual test sections
  const handleSectionClick = (section) => {
    navigate(`/${section}-tests/${userId}`);
    if (section === 'upcoming') {
      navigate(`/upcoming-tests`);
    } else if (section === 'attended') {
      navigate(`/attended-tests/${userId}`);
    } else if (section === 'completed') {
      navigate(`/completed-tests/${userId}`);
    }
  };

  return (
    <div className="dashboard-container">
      <UserSideBar onLogout={() => navigate('/login')} />
      
      <div className="dashboard-content">
        <h1 className='userName'>Welcome, {userInfo.username}</h1>
        <p className='rollNo'>Roll Number: {userInfo.rollNo}</p>

        <div className='dashboard-boxes'>
          <div className="dashboard-box" onClick={() => handleSectionClick('upcoming')}>
            <h3>Upcoming Tests</h3>
            <div className="test-count">
              {upcomingTests.length > 0 ? `${upcomingTests.length} Upcoming Tests` : 'No upcoming tests'}
            </div>
          </div>

          <div className="dashboard-box" onClick={() => handleSectionClick('attended')}>
            <h3>Attended Tests</h3>
            <div className="test-count">
              {attendedTests.length > 0 ? `${attendedTests.length} Attended Tests` : 'No attended tests'}
            </div>
          </div>

          <div className="dashboard-box" onClick={() => handleSectionClick('completed')}>
            <h3>Completed Tests</h3>
            <div className="test-count">
              {completedTests.length > 0 ? `${completedTests.length} Completed Tests` : 'No completed tests'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
