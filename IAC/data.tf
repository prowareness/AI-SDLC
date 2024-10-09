

data "azurerm_key_vault_secret" "subscription_id" {
  name         = "AISDLC-subscription-id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "client_id" {
  name         = "AISDLC-client-id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "client_secret" {
  name         = "AISDLC-client-secret"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}

data "azurerm_key_vault_secret" "tenant_id" {
  name         = "AISDLC-tenant-id"
  key_vault_id = data.azurerm_key_vault.existing_vault.id
}
