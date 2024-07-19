terraform {
  backend "azurerm" {
    resource_group_name  = "AISDLC"
    storage_account_name = "aistatefile"
    container_name       = "statefile"
    key                  = "state.tfstate"
  }
}
