# Retrive a resource group
data "azurerm_resource_group" "aisdlc_resource_group" {
  name = "AISDLC"
}

# Create a virtual network and subnet
resource "azurerm_virtual_network" "aisdlc_virtual_network" {
  name                = "SDLC-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = data.azurerm_resource_group.aisdlc_resource_group.location
  resource_group_name = data.azurerm_resource_group.aisdlc_resource_group.name
}

resource "azurerm_subnet" "aisdlc_subnet" {
  name                 = "SDLC-subnet"
  resource_group_name  = data.azurerm_resource_group.aisdlc_resource_group.name
  virtual_network_name = azurerm_virtual_network.aisdlc_virtual_network.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Create a network security group and rules
resource "azurerm_network_security_group" "aisdlc_sg" {
  name                = "SDLC-nsg"
  location            = data.azurerm_resource_group.aisdlc_resource_group.location
  resource_group_name = data.azurerm_resource_group.aisdlc_resource_group.name

  security_rule {
    name                       = "SSH"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "Tomcat"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "8080"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# Create a network interface
resource "azurerm_network_interface" "aisdlc_nertwork_interface" {
  name                = "SDLC-nic"
  location            = data.azurerm_resource_group.aisdlc_resource_group.location
  resource_group_name = data.azurerm_resource_group.aisdlc_resource_group.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.aisdlc_subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.aisdlc_public_ip.id
  }
}

# Associate the network security group with the network interface
resource "azurerm_network_interface_security_group_association" "aisdlc_network_interface_security_group_association" {
  network_interface_id      = azurerm_network_interface.aisdlc_nertwork_interface.id
  network_security_group_id = azurerm_network_security_group.aisdlc_sg.id
}

# Create a public IP address
resource "azurerm_public_ip" "aisdlc_public_ip" {
  name                = "SDLC-pip"
  location            = data.azurerm_resource_group.aisdlc_resource_group.location
  resource_group_name = data.azurerm_resource_group.aisdlc_resource_group.name
  allocation_method   = "Dynamic"
}

# Create a virtual machine
resource "azurerm_linux_virtual_machine" "aisdlc_vm" {
  name                = "SDLC-vm"
  resource_group_name = data.azurerm_resource_group.aisdlc_resource_group.name
  location            = data.azurerm_resource_group.aisdlc_resource_group.location
  size                = "Standard_DC1s_v2"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.aisdlc_nertwork_interface.id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("~/.ssh/id_rsa.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts-gen2"
    version   = "latest"
  }

  user_data = base64encode(file("deploy_userdata.sh"))
}


output "public_ip_address" {
  value = azurerm_public_ip.aisdlc_public_ip.ip_address
}
