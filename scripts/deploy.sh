#!/bin/bash

# Install Terraform
wget https://releases.hashicorp.com/terraform/1.4.6/terraform_1.4.6_linux_amd64.zip
unzip terraform_1.4.6_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm terraform_1.4.6_linux_amd64.zip

# Change to the IAC folder
pwd
cd ./IAC

# Initialize Terraform
terraform init

# Apply Terraform configuration
terraform import  azurerm_virtual_machine_data_disk_attachment.disk_attachment /subscriptions/434d9ccf-0fbf-4203-a25a-314f7650f6f7/resourceGroups/AISDLC/providers/Microsoft.Compute/virtualMachines/SDLC-vm/dataDisks/AI-SDLC-Database
#terraform apply -auto-approve
