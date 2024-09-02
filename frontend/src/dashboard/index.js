import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [vacancies, setVacancies] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const props = location.state;
  const handleCreateJobClick = () => {
    navigate("/create-job");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  let totalPages = Math.ceil(vacancies.length / recordsPerPage);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = vacancies.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Function to fetch vacancies from API
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          `http://172.190.178.164:8080/recruitment/api/vacancies?createdBy=john.doe@devon.nl&limit=100&offset=0`
        );
        // ${props.username}
        setVacancies(response.data.vacancies);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error fetching vacancies:", error);
      }
    };

    fetchVacancies();
  }, []);

  const renderPageNumbers = () => {
    let pages = [];

    // If there are fewer than or equal to 3 pages, display all page numbers
    if (totalPages <= 3) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      // If there are more than 3 pages, display first, dots, current, dots, last
      pages.push(1); // First page

      if (currentPage > 2) {
        pages.push("..."); // Dots before current
      }

      if (currentPage > 1 && currentPage < totalPages) {
        pages.push(currentPage); // Current page
      }

      if (currentPage < totalPages - 1) {
        pages.push("..."); // Dots after current
      }

      pages.push(totalPages); // Last page
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`pagination-button ${
            currentPage === page ? "active" : ""
          }`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="pagination-dots">
          {page}
        </span>
      )
    );
  };

  const handleRowClick = async (vacancyId) => {
    try {
      const response = await axios.get(
        `http://172.190.178.164:8080/recruitment/api/vacancies/${vacancyId}`
      );
      navigate(`/jobdetails/${vacancyId}`, {
        state: { vacancy: response.data },
      });
      console.log("Vacancy details:", response.data);
    } catch (error) {
      console.error("Error fetching vacancy details:", error);
    }
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
          <div className="table-pagination-container">
            <table className="vacancy-table">
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Job Title</th>
                  <th>Last date to apply</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((vacancy, index) => (
                  <tr
                    key={index}
                    className="vacancy-item"
                    onClick={() => handleRowClick(vacancy.vacancyId)}
                  >
                    <td className="vacancy-details">{vacancy.vacancyId}</td>
                    <td className="vacancy-details">{vacancy.jobTitle}</td>
                    <td className="vacancy-date">
                      {new Date(
                        vacancy.applicationDeadline
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {vacancies.length > recordsPerPage && (
              <div className="pagination">
                <button
                  onClick={handlePreviousPage}
                  className="pagination-button"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button
                  onClick={handleNextPage}
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <div className="total-vacancies">
            <h3>Total Vacancies</h3>
            <h2>{total}</h2>
          </div>
        </div>
      </div>

      {/* Total Vacancies */}
    </div>
  );
};

export default Dashboard;
