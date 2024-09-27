resource "null_resource" "reset_password" {
  depends_on = azurerm_linux_virtual_machine.aisdlc_vm
  triggers = {
    vm_id = azurerm_virtual_machine.example.id  # Trigger based on VM creation
  }
  provisioner "local-exec" {
    command = <<-EOF
                az vm user update --resource-group "$RESOURCE_GROUP" --name "$VM_NAME" --username "$USER_NAME" --password "$PASSWORD"
                EOF
    envirnoment = {
        RESOURCE_GROUP = data.azurerm_resource_group.aisdlc_resource_group.name
        VM_NAME =azurerm_linux_virtual_machine.name
        USER_NAME = "adminuser"
        PASSWORD = data.azzure_password
    }
  }
}

