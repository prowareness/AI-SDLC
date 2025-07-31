provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0" # Example for Ubuntu 20.04 LTS
  instance_type = "t2.micro"

  security_groups = [aws_security_group.allow_ssh_http_https.name]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y git nginx openjdk-11-jdk
              # Install Node.js
              curl -sL https://deb.nodesource.com/setup_14.x | bash -
              apt-get install -y nodejs
              
              # Clone repository
              git clone <your-github-repo-url> /home/ubuntu/app
              cd /home/ubuntu/app/frontend
              npm install
              npm run build
              
              cd /home/ubuntu/app/backend
              ./gradlew build
              
              # Start frontend (assuming you have some server to serve the build)
              cd /home/ubuntu/app/frontend
              npm start &

              # Start backend
              cd /home/ubuntu/app/backend
              java -jar build/libs/<your-backend-jar>.jar &
              
              # Optionally, restart Nginx to serve frontend
              service nginx restart
              EOF

  tags = {
    Name = "AppServer"
  }
}

resource "aws_security_group" "allow_ssh_http_https" {
  name        = "allow_ssh_http_https"
  description = "Allow SSH, HTTP, and HTTPS access"

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

output "instance_ip" {
  value = aws_instance.app.public_ip
}