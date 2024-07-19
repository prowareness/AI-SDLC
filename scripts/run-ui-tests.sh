# Step-by-step pseudocode:
# 1. Run the playwright test using npm.
# 2. Capture the exit code of the playwright test command.
# 3. Check if the playwright test command was successful.
# 4. If successful, copy the generated report to the default Azure artifact directory.
# 5. Exit the script with the captured exit code.

# Actual shell script:
#!/bin/bash

# Run playwright test using npm
npm run test

# Capture the exit code
exitCode=$?

# Check if the command was successful (exit code 0)
if [ $exitCode -eq 0 ]; then
    # Assuming the reports are generated in a 'reports' directory
    # Copy the reports to the default Azure artifact directory
    # Replace '/path/to/azure/artifacts' with the actual path to the Azure artifacts directory
    cp -r reports/ /path/to/azure/artifacts/
fi

# Exit with the captured exit code
exit $exitCode