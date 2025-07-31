provider "aws" {
  region = "us-west-2" // Change to your preferred region
}

resource "aws_security_group" "allow_ssh_http_https" {
  name        = "allow_ssh_http_https"
  description = "Allow SSH, HTTP, and HTTPS"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // Allow SSH from anywhere
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // Allow HTTP from anywhere
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] // Allow HTTPS from anywhere
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" // Allow all outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0" // Example: replace with the latest Amazon Linux 2 or Ubuntu AMI ID
  instance_type = "t2.micro"
  security_groups = [aws_security_group.allow_ssh_http_https.name]

  user_data = <<-EOF
              #!/bin/bash
              # Update and install dependencies
              yum update -y
              yum install -y git

              # Install Node.js for Frontend
              curl -sL https://rpm.nodesource.com/setup_14.x | bash -
              yum install -y nodejs

              # Install Java for Backend
              yum install -y java-1.8.0-openjdk

              # Clone the repository
              git clone https://your-repo-url.git
              cd your-repo-name

              # Install Backend Dependencies
              cd backend
              ./gradlew build

              # Start Backend
              java -jar build/libs/your-backend-jar-file.jar &

              # Install Frontend Dependencies
              cd ../frontend
              npm install
              npm run build
              nohup npm start &
              
              EOF

  tags = {
    Name = "DevOps Instance"
  }
}

output "public_ip" {
  value = aws_instance.web.public_ip
}