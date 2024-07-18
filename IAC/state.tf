terraform {
  backend "azurerm" {
    resource_group_name  = "AI-SDLC"
    storage_account_name = "aistatefile"
    container_name       = "YOUR_CONTAINER_NAME"
    key                  = "state.tfstate"
  }
}
