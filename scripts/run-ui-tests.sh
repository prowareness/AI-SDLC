#!/bin/bash
cd test
# Define Azure artifact directory
AZURE_ARTIFACT_DIR="artifacts"

sudo apt install nodejs

sudo apt install npm

# install dependencies
npm install

# Run install required browsers
npm run install:browsers

# Run Playwright tests using npm
npm run test

# Capture the exit code
exitCode=$?

# Check if the command was successful (exit code 0)
if [ $exitCode -eq 0 ]; then
    # Assuming the reports are generated in a 'reports' directory
    # Copy the reports to the Azure artifact directory
    cp -r reports/ "$AZURE_ARTIFACT_DIR"
fi

# Exit with the captured exit code
exit $exitCode
