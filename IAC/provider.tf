terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0" # Specify the version you want to use
    }
  }
}

# Retrieve secret value from Key Vault
data "azurerm_key_vault_secret" "client_secret" {
  name         = "AISDLC"
  key_vault_id = "24b080cd-5874-44ab-9862-8d7e0e0781ab"
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
  client_id       = var.client_id
  client_secret   = var.client_secret
  tenant_id       = var.tenant_id
}
