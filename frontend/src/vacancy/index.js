import { Button, Link } from "@mui/material";
import React, { useState } from "react";
import UserForm from "../vacancy-form";

function Homepage() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [showUserForm, setShowUserForm] = useState(false);

  const handleVacancyForm = () => {
    setShowHomePage(false);
    setShowUserForm(true);
  };
  return (
    <div>
      {showHomePage && (
        <div style={{ marginTop: "50px", gap: "10px" }}>
          <h1
            style={{
              fontFamily: "Roboto",
              fontSize: "40px",
              fontWeight: "1000",
              lineHeight: "36px",
              textAlign: "center",
            }}
          >
            Create Vacancy
          </h1>
          <Button
            onClick={handleVacancyForm}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
          {/* <input
          type="text"
          placeholder="Job Title"
          style={{
            width: "360px",
            height: "36px",
          }}
        /> */}
        </div>
      )}
      {showUserForm && <UserForm />}
    </div>
  );
}

export default Homepage;
