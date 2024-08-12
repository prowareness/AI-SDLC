#!/bin/bash

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.4.6/terraform_1.4.6_linux_amd64.zip
unzip terraform_1.4.6_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_1.4.6_linux_amd64.zip

# Change to the IAC folder
cd /IAC/

# Initialize Terraform
terraform init

# Apply Terraform configuration
terraform apply -auto-approve
