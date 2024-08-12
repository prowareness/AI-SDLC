import React from "react";
import "./style.css";

const Dashboard = () => {
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
        <button className="create-job-btn">Create Job Vacancy</button>
      </div>

      {/* Job Vacancy Dashboard */}
      <div className="dashboard-content">
        <h4>Job Vacancy Dashboard</h4>
        <p>Overview of current job vacancies</p>

        <div className="vacancy-list">
          <div className="vacancy-item">
            <div className="vacancy-avatar">
              <img src="https://via.placeholder.com/40" alt="Job Avatar" />
            </div>
            <div className="vacancy-details">
              <h6>Software Engineer</h6>
              <p className="status">Open</p>
            </div>
            <div className="vacancy-date">Posted on 2022-10-15</div>
          </div>

          <div className="vacancy-item">
            <div className="vacancy-avatar">
              <img src="https://via.placeholder.com/40" alt="Job Avatar" />
            </div>
            <div className="vacancy-details">
              <h6>Marketing Specialist</h6>
              <p className="status closed">Closed</p>
            </div>
            <div className="vacancy-date">Posted on 2022-10-10</div>
          </div>
        </div>
      </div>

      {/* Total Vacancies */}
      <div className="total-vacancies">
        <h6>Total Vacancies</h6>
        <h4>50</h4>
      </div>
    </div>
  );
};

export default Dashboard;
