data "azurerm_key_vault" "existing_vault" {
  name                = "AISDLC"
  resource_group_name = "AISDLC"
}

data "azurerm_key_vault_secret" "vm_password" {
  name         = "AISDLC-newVM"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "subscription_id" {
  name         = "AISDLC-subscription_id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "client_id" {
  name         = "AISDLC-client_id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "client_secret" {
  name         = "AISDLC-client_secret"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "tenant_id" {
  name         = "AISDLC-tenant_id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}
