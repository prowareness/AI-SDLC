#!/bin/bash

# Define the Postman collection
POSTMAN_COLLECTION="Your_Postman_Collection.json"

# Define the environment file
ENV_FILE="Your_Environment_File.json"

# Define the report file
REPORT_FILE="newman-report.html"

# Define the Azure artifact directory
AZURE_ARTIFACT_DIR="Your_Azure_Artifact_Directory"

# Run the Postman collection with Newman and generate an HTML report
newman run $POSTMAN_COLLECTION -e $ENV_FILE --reporters cli,html --reporter-html-export $REPORT_FILE

# Capture the exit code
EXIT_CODE=$?

# Copy the report to the Azure artifact directory
cp $REPORT_FILE $AZURE_ARTIFACT_DIR

# Exit with the Newman exit code
exit $EXIT_CODE