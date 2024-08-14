import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const vacancies = [
    {
      jobid: "JOB1234",
      title: "Software Engineer",
      date: "2022-10-15",
      status: "Open",
    },
    {
      jobid: "JOB3456",
      title: "Marketing Specialist",
      date: "2022-10-10",
      status: "Closed",
    },
  ];
  const navigate = useNavigate();
  const handleCreateJobClick = () => {
    navigate("/create-job");
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="user-info">
          <div className="avatar">
            <img src="https://via.placeholder.com/56" alt="User Avatar" />
          </div>
          <div className="user-details">
            <h6>John Doe</h6>
            <p>Welcome to the Job Vacancy Dashboard</p>
          </div>
        </div>
        <button className="create-job-btn" onClick={handleCreateJobClick}>
          Create Job Vacancy
        </button>
      </div>

      {/* Job Vacancy Dashboard */}
      <div className="dashboard-content">
        <h4>Job Vacancy Dashboard</h4>
        <p>Overview of current job vacancies</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            margin: "20px 0",
          }}
        >
          <table className="vacancy-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Posted Date</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy, index) => (
                <tr key={index} className="vacancy-item">
                  <td className="vacancy-details">{vacancy.title}</td>
                  <td className="vacancy-details">{vacancy.jobid}</td>
                  <td className="vacancy-date">
                    {new Date(vacancy.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-vacancies">
            <h3>Total Vacancies</h3>
            <h2>{vacancies.length}</h2>
          </div>
        </div>
      </div>

      {/* Total Vacancies */}
    </div>
  );
};

export default Dashboard;
