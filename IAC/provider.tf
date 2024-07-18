terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0" # Specify the version you want to use
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "56edc819-264e-4a3c-be6f-1496e0b07eeb"
  client_id       = "YOUR_AZURE_CLIENT_ID"
  client_secret   = "YOUR_AZURE_CLIENT_SECRET"
  tenant_id       = "YOUR_AZURE_TENANT_ID"
}
