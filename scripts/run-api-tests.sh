#!/bin/bash

# Define Postman collection and environment files
COLLECTION_PATH="path/to/your/collection.json"
ENVIRONMENT_PATH="path/to/your/environment.json"
# Define the output directory for the HTML report
REPORT_OUTPUT_DIR="./newman"
REPORT_NAME="postman_report.html"
# Define Azure artifact directory
AZURE_ARTIFACT_DIR="/path/to/azure/artifact/directory"

# Ensure the report output directory exists
mkdir -p $REPORT_OUTPUT_DIR

# Run the Postman collection with Newman and generate an HTML report
newman run $COLLECTION_PATH -e $ENVIRONMENT_PATH --reporters=cli,htmlextra --reporter-htmlextra-export $REPORT_OUTPUT_DIR/$REPORT_NAME

# Capture the exit code of the Newman command
EXIT_CODE=$?

# Copy the HTML report to the Azure artifact directory
cp $REPORT_OUTPUT_DIR/$REPORT_NAME $AZURE_ARTIFACT_DIR

# Exit the script with the Newman command's exit code
exit $EXIT_CODE