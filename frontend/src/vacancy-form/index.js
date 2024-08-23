import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Dialog,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Homepage from "../vacancy";
import axios from "axios";
import Dashboard from "../dashboard";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [showUserForm, setShowUserForm] = useState(true);
  const [open, setOpen] = useState(false);
  const [vacancyId, setVacancyId] = useState("");
  let response;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    requirements: "",
    location: "",
    maxSalary: "",
    applicationDeadline: "",
    //createdBy: "john.doe@devon.nl",
  });
  const [errors, setErrors] = useState({
    jobTitle: false,
    description: false,
    requirements: false,
    location: false,
    maxSalary: false,
    applicationDeadline: false,
  });
  const [helperTexts, setHelperTexts] = useState({
    jobTitle: "",
    description: "",
    requirements: "",
    location: "",
    maxSalary: "",
    applicationDeadline: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = true;
    let helperText = "";
    if (name === "jobTitle" && value.trim() === "") {
      isValid = false;
      helperText = "Job Title cannot be empty";
    } else if (name === "description" && value.trim() === "") {
      isValid = false;
      helperText = "Description cannot be empty";
    } else if (name === "requirements" && value.trim() === "") {
      isValid = false;
      helperText = "Requirements cannot be empty";
    } else if (name === "location" && value.trim() === "") {
      isValid = false;
      helperText = "Location cannot be empty";
    } else if (
      name === "maxSalary" &&
      (value.trim() === "" || /^-?\d*(\.\d{0,2})?$/.test(value) === false)
    ) {
      isValid = false;
      helperText =
        "Only numeric values with up to two decimal places are allowed";
    } else if (name === "applicationDeadline" && value.trim() === "") {
      isValid = false;
      helperText = "Last date cannot be empty";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValid,
    }));

    setHelperTexts((prevHelperTexts) => ({
      ...prevHelperTexts,
      [name]: helperText,
    }));
  };

  const areAllErrorsFalse = () => {
    return Object.values(errors).every((error) => error === false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fields = Object.keys(formData);
    fields.forEach((field) => {
      validateField(field, formData[field]);
    });
    const isAtLeastOneFieldNotEmpty = fields.some(
      (field) => formData[field] !== ""
    );
    if (areAllErrorsFalse() && isAtLeastOneFieldNotEmpty) {
      formData.applicationDeadline += "T00:00:00";
      formData.createdBy = "john.doe@devon.nl";

      try {
        response = await axios.post(
          "http://172.190.178.164:8080/recruitment/api/vacancies",
          formData
        );
        console.log("Response:", response);
      } catch (error) {
        console.error("Error making the request:", error);
      }
      if (response?.status === 201 && response?.vacancyId !== null) {
        setVacancyId(response.data.vacancyId);
        setOpen(true);
      }
      console.log("Form Data:", formData);
    } else {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setShowUserForm(false);
    setShowHomePage(true);
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      {showUserForm && (
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Job Details
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="job-title"
              label="Job Title"
              name="jobTitle"
              autoComplete="job title"
              value={formData.jobTitle}
              onChange={handleChange}
              error={errors.jobTitle}
              helperText={helperTexts.jobTitle}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              autoFocus
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              helperText={helperTexts.description}
            />
            <TextField
              margin="normal"
              fullWidth
              id="requirements"
              label="Requirements"
              name="requirements"
              autoComplete="requirements"
              multiline
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              error={errors.requirements}
              helperText={helperTexts.requirements}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="locations-label">Location</InputLabel>
              <Select
                labelId="locations-label"
                id="locations"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={errors.location}
              >
                <MenuItem value="Bangalore">Bangalore</MenuItem>
                <MenuItem value="Gurgaon">Gurgaon</MenuItem>
                <MenuItem value="Netherlands">Netherlands</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "red" }}>
                {helperTexts.location}
              </FormHelperText>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="max-salary"
              label="Max Salary"
              name="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              error={errors.maxSalary}
              helperText={helperTexts.maxSalary}
            />
            <TextField
              margin="normal"
              fullWidth
              id="last-date"
              label="Last date to apply"
              name="applicationDeadline"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.applicationDeadline}
              onChange={handleChange}
              error={errors.applicationDeadline}
              helperText={helperTexts.applicationDeadline}
            />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
          {"Success"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {vacancyId} created successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {showHomePage && navigate("/dashboard")}
    </Container>
  );
}

export default UserForm;
