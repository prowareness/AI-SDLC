import logo from "./logo.svg";
import "./App.css";
import Homepage from "./vacancy";
import Headers from "./header";
import LoginForm from "./login-form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import UserForm from "./vacancy-form";
import JobDetails from "./jobdetails";

function App() {
  return (
    <div className="App">
      <Headers />
      <Router>
        <Routes>
          <Route path="/vacancy" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-job" element={<UserForm />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
