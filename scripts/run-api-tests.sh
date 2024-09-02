#!/bin/bash

cd api-test
# Define Postman collection and environment files
COLLECTION_PATH="./test.collection.json"
ENVIRONMENT_PATH="./environments/test.environment.json"

# Define the output directory for the HTML report
REPORT_OUTPUT_DIR="./report"
REPORT_NAME="postman_report.html"

# Define Azure artifact directory
AZURE_ARTIFACT_DIR="artifacts"

# Ensure the report output directory exists
mkdir -p "$REPORT_OUTPUT_DIR"

# Install dependencies
npm install -g newman newman-reporter-htmlextra

# Run the Postman collection with Newman and generate an HTML report
npx newman run "$COLLECTION_PATH" -e "$ENVIRONMENT_PATH" --reporters=cli,htmlextra --reporter-htmlextra-export "$REPORT_OUTPUT_DIR/$REPORT_NAME"

# Capture the exit code of the Newman command
exitCode=$?

# Copy the HTML report to the Azure artifact directory
cp "$REPORT_OUTPUT_DIR/$REPORT_NAME" "$AZURE_ARTIFACT_DIR"

# Exit the script with the Newman command's exit code
exit $exitCode
