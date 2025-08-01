provider "aws" {
  region = "us-east-1" # Change as necessary
}

resource "aws_security_group" "web_sg" {
  name_prefix = "web-sg-"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Adjust this for better security
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

resource "aws_instance" "app_server" {
  ami           = "ami-xxxxxxxx" # Replace with the latest Ubuntu or Amazon Linux AMI
  instance_type = "t2.micro"
  key_name      = "your-key-name" # Replace with your SSH key name
  
  security_groups = [aws_security_group.web_sg.name]

  user_data = <<-EOF
              #!/bin/bash
              # Update packages
              sudo apt-get update -y
              sudo apt-get upgrade -y

              # Install Node.js, Nginx, and Git
              curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
              sudo apt-get install -y nodejs nginx git

              # Clone the repository (Assumed to be public or provide your credentials for private)
              git clone https://github.com/yourusername/your-repo.git /home/ubuntu/app

              # Navigate to the backend directory and install dependencies
              cd /home/ubuntu/app/backend
              npm install
              npm start & # Assuming you have a start script

              # Navigate to the frontend directory and install dependencies
              cd /home/ubuntu/app/frontend
              npm install
              npm run build & # Assuming a build script available

              # Configure Nginx to serve the frontend and proxy to the backend
              sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOF
              server {
                  listen 80;

                  location / {
                      root /home/ubuntu/app/frontend/build;
                      index index.html index.htm;
                      try_files \$uri \$uri/ /index.html;
                  }

                  location /api/ {
                      proxy_pass http://localhost:3000; # Assuming backend runs on port 3000
                      proxy_http_version 1.1;
                      proxy_set_header Upgrade \$http_upgrade;
                      proxy_set_header Connection 'upgrade';
                      proxy_set_header Host \$host;
                      proxy_cache_bypass \$http_upgrade;
                  }
              }
              EOF
              '

              # Restart Nginx
              sudo systemctl restart nginx
              EOF

  tags = {
    Name = "AppServer"
  }
}

output "instance_ip" {
  value = aws_instance.app_server.public_ip
}