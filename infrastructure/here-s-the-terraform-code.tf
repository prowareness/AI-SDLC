provider "aws" {
  region = "us-east-1"  # Change this to your required AWS region
}

resource "aws_security_group" "allow_ssh_http_https" {
  name        = "allow_ssh_http_https"
  description = "Allow SSH, HTTP, and HTTPS traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  # All traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0b69ea66ff7391e80"  # Example AMI for Ubuntu, use latest LTS or Amazon Linux 2
  instance_type = "t2.micro"  # Change to suitable instance type
  security_groups = [aws_security_group.allow_ssh_http_https.name]

  user_data = <<-EOF
              #!/bin/bash
              # Update the package manager and install necessary packages
              apt-get update
              apt-get install -y nodejs npm git nginx
              # Clone the repository
              git clone <repository_url> /home/ubuntu/repo
              cd /home/ubuntu/repo/frontend
              npm install
              npm run build
              cd ../backend
              npm install
              npm start  # Adjust according to your backend command

              # Start Nginx for serving the frontend
              systemctl start nginx
              systemctl enable nginx
              EOF

  tags = {
    Name = "DevOpsDemoInstance"
  }
}

output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
}