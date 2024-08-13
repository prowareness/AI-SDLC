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
  
}
