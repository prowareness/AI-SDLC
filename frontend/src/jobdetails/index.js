import React, { useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state;
  const jobDetail = props.vacancy;
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    jobId: jobDetail.vacancyId,
    jobTitle: jobDetail.jobTitle,
    jobDescription: jobDetail.description,
    jobRequirements: jobDetail.requirements,
    maxSalary: jobDetail.maxSalary,
    location: jobDetail.location,
    lastDateToApply: jobDetail.applicationDeadline,
  });
  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://172.190.178.164:8080/recruitment/api/vacancies/${formData.jobId}`,
        {
          jobTitle: formData.jobTitle,
          description: formData.jobDescription,
          requirements: formData.jobRequirements,
          location: formData.location,
          applicationDeadline: formData.lastDateToApply,
          maxSalary: formData.maxSalary,
          createdBy: "john.doe@devon.nl",
        }
      );
      setIsEditable(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating job details:", error);
    }
  };

  return (
    <div className="job-details-container">
      <div className="job-details-form">
        <h1>Job Details</h1>
        <form>
          <div className="form-group">
            <label>Job ID</label>
            <input
              type="text"
              name="jobId"
              value={formData.jobId}
              onChange={handleInputChange}
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Job Requirements</label>
            <input
              type="text"
              name="jobRequirements"
              value={formData.jobRequirements}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditable} // Use disabled instead of readOnly for select elements
            >
              <option value="Bangalore">Bangalore</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Netherlands">Netherlands</option>
            </select>
          </div>
          <div className="form-group">
            <label>Max Salary</label>
            <input
              type="text"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Last Date to Apply</label>
            <input
              type="text"
              name="lastDateToApply"
              value={formData.lastDateToApply}
              onChange={handleInputChange}
              readOnly={!isEditable}
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleEditClick}
            >
              {isEditable ? "Cancel" : "Edit"}
            </button>
            {isEditable && (
              <button
                type="button"
                className="btn btn-save"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobDetails;
