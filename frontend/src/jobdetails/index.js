import React, { useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const props = location.state;
  const jobDetail = props.vacancy;
  console.log("Job Details:", jobDetail);
  const [isEditable, setIsEditable] = useState(false);
  const [formData, setFormData] = useState({
    jobId: jobDetail.vacancyId,
    jobDescription: jobDetail.description,
    jobRequirements: jobDetail.requirements,
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

  const handleSave = () => {
    setIsEditable(false);
    navigate("/dashboard");
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
