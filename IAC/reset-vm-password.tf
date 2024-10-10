resource "null_resource" "login" {
  provisioner "local-exec" {
    command = <<EOT
      az login --service-principal -u "$client_id" -p "$client_secret" --tenant "$tenant_id"
    EOT

    environment = {
      client_id = data.azurerm_key_vault_secret.client_id.value
      client_secret        = data.azurerm_key_vault_secret.client_secret.value
      tenant_id      = data.azurerm_key_vault_secret.tenant_id.value
    }
  }

}

resource "null_resource" "reset_password" {
  depends_on = [azurerm_linux_virtual_machine.aisdlc_vm,null_resource.login] 
  
  triggers = {
    vm_id = azurerm_linux_virtual_machine.aisdlc_vm.id  # Trigger based on VM creation
  }
  
  provisioner "local-exec" {
    command = <<-EOF
      az vm user update --resource-group "$RESOURCE_GROUP" --name "$VM_NAME" --username "$USER_NAME" --password "$PASSWORD"
    EOF
    
    environment = {
      RESOURCE_GROUP = data.azurerm_resource_group.aisdlc_resource_group.name
      VM_NAME        = azurerm_linux_virtual_machine.aisdlc_vm.name
      USER_NAME      = "adminuser"
      PASSWORD       = data.azurerm_key_vault_secret.vm_password.value
    }
  }
}

