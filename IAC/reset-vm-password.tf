resource "null_resource" "login" {
  provisioner "local-exec" {
    command = <<EOT
      az login --service-principal -u "${var.client_id}" -p "${var.client_secret}" --tenant "${var.tenant_id}"
    EOT
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

