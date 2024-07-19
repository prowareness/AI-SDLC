terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0" # Specify the version you want to use
    }
  }
}

# Retrieve secret value from Key Vault
#data "azurerm_key_vault_secret" "client_secret" {
#  name         = "AISDLC"
#  key_vault_id = "24b080cd-5874-44ab-9862-8d7e0e0781ab"
#}

provider "azurerm" {
  features {}
  subscription_id = "434d9ccf-0fbf-4203-a25a-314f7650f6f7"
  client_id       = "bf8bc755-1024-412f-b6c2-ee47258506fa"
  client_secret   = "L4F8Q~zoAu5OrhFEtiqWCFuKUWIrvwgHjDDdrcZk"
  tenant_id       = "24b080cd-5874-44ab-9862-8d7e0e0781ab"
}
