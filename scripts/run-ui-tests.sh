#!/bin/bash

# Step 1: Install dependencies
npm install

# Step 2: Run the test and capture the exit code
npm test
exit_code=$?

# Step 3: Check if the report exists and copy it to the Azure artifact directory
report_path="./report.json"  # replace with your actual report path
artifact_dir="$(Build.ArtifactStagingDirectory)"  # Azure artifact directory

if [ -f "$report_path" ]; then
    cp $report_path $artifact_dir
fi

# Step 4: Exit with the captured exit code
exit $exit_code