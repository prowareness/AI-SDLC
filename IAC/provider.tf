terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0" # Specify the version you want to use
    }
  }
}

data "azurerm_key_vault_secret" "client_secret" {
  name         = "terraform-client-secret"
  key_vault_id = "/subscriptions/434d9ccf-0fbf-4203-a25a-314f7650f6f7/resourceGroups/AI-SDLC/providers/Microsoft.KeyVault/vaults/AI-SDLC-key"
}

provider "azurerm" {
  features {}
  subscription_id = "434d9ccf-0fbf-4203-a25a-314f7650f6f7"
  client_id       = "YOUR_AZURE_CLIENT_ID"
  client_secret   = "YOUR_AZURE_CLIENT_SECRET"
  tenant_id       = "YOUR_AZURE_TENANT_ID"
}
