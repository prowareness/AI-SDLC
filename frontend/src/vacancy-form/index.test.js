import { render, screen, fireEvent } from "@testing-library/react";
import UserForm from "./index";

test("renders UserForm component", () => {
  render(<UserForm />);
  const jobTitleInput = screen.getByLabelText(/Job Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const requirementsInput = screen.getByLabelText(/Requirements/i);
  const locationsSelect = screen.getByLabelText(/Locations/i);
  const salaryInput = screen.getByLabelText(/Salary/i);
  const lastDateInput = screen.getByLabelText(/Last date to apply/i);
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  expect(jobTitleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(requirementsInput).toBeInTheDocument();
  expect(locationsSelect).toBeInTheDocument();
  expect(salaryInput).toBeInTheDocument();
  expect(lastDateInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("validates form fields", () => {
  render(<UserForm />);
  const jobTitleInput = screen.getByLabelText(/Job Title/i);
  const descriptionInput = screen.getByLabelText(/Description/i);
  const requirementsInput = screen.getByLabelText(/Requirements/i);
  const locationsSelect = screen.getByLabelText(/Locations/i);
  const salaryInput = screen.getByLabelText(/Salary/i);
  const lastDateInput = screen.getByLabelText(/Last date to apply/i);
  const submitButton = screen.getByRole("button", { name: /Submit/i });

  // Fill in form fields
  fireEvent.change(jobTitleInput, { target: { value: "Software Engineer" } });
  fireEvent.change(descriptionInput, { target: { value: "Job description" } });
  fireEvent.change(requirementsInput, {
    target: { value: "Job requirements" },
  });
  fireEvent.change(locationsSelect, { target: { value: "Bangalore" } });
  fireEvent.change(salaryInput, { target: { value: "50000" } });
  fireEvent.change(lastDateInput, { target: { value: "2022-12-31" } });

  // Submit the form
  fireEvent.click(submitButton);

  // Assert that form validation errors are not displayed
  expect(screen.queryByText(/Job Title cannot be empty/i)).toBeNull();
  expect(screen.queryByText(/Description cannot be empty/i)).toBeNull();
  expect(screen.queryByText(/Requirements cannot be empty/i)).toBeNull();
  expect(screen.queryByText(/Locations cannot be empty/i)).toBeNull();
  expect(
    screen.queryByText(
      /Only numeric values with up to two decimal places are allowed/i
    )
  ).toBeNull();
  expect(screen.queryByText(/Last date cannot be empty/i)).toBeNull();
});

// Add more tests as needed
