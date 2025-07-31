provider "aws" {
  region = "us-west-2" # Change to your desired region
}

resource "aws_security_group" "my_security_group" {
  name        = "my-security-group"
  description = "Allow SSH, HTTP, and HTTPS"

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
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_instance" {
  ami           = "ami-0c55b159cbfafe01e" # Use the AMI ID for Ubuntu latest LTS or Amazon Linux 2
  instance_type = "t2.micro" # Adjust as necessary
  key_name      = "your-key-name"

  security_groups = [aws_security_group.my_security_group.name]

  user_data = <<-EOF
              #!/bin/bash
              # Install dependencies
              sudo apt-get update
              sudo apt-get install -y nodejs npm openjdk-11-jdk

              # Install Nginx
              sudo apt-get install -y nginx
              sudo systemctl start nginx
              sudo systemctl enable nginx

              # Clone the repository (replace with your repo URL)
              git clone https://github.com/yourusername/repo.git /var/www/myapp
              cd /var/www/myapp/frontend
              npm install
              npm run build

              # Build and run backend
              cd ../backend
              ./gradlew build
              java -jar build/libs/<your-backend-jar>.jar > /var/log/myapp.log 2>&1 &
              EOF

  tags = {
    Name = "MyAppServer"
  }
}

output "public_ip" {
  value = aws_instance.app_instance.public_ip
}