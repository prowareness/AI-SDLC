#!/bin/bash

# Update package index
echo "Updating package index..."
sudo apt update

# Install Java (OpenJDK 11)
echo "Installing Java..."
sudo apt install -y openjdk-11-jdk

# Check Java installation
java -version

# Set JAVA_HOME environment variable
echo "Setting JAVA_HOME environment variable..."
JAVA_HOME=$(dirname $(dirname $(readlink -f $(which java))))
echo "export JAVA_HOME=$JAVA_HOME" | sudo tee -a /etc/profile
source /etc/profile

# Download Tomcat 10
echo "Downloading Tomcat 10..."
TOMCAT_VERSION=10.1.28
wget https://downloads.apache.org/tomcat/tomcat-10/v$TOMCAT_VERSION/bin/apache-tomcat-$TOMCAT_VERSION.tar.gz

# Extract Tomcat
echo "Extracting Tomcat..."
sudo mkdir -p /opt/tomcat
sudo tar xzvf apache-tomcat-$TOMCAT_VERSION.tar.gz -C /opt/tomcat --strip-components=1

# Set permissions
echo "Setting permissions..."
sudo chown -R $USER:$USER /opt/tomcat
sudo chmod +x /opt/tomcat/bin/*.sh

# Create systemd service file for Tomcat
echo "Creating systemd service file for Tomcat..."
sudo tee /etc/systemd/system/tomcat.service > /dev/null <<EOF
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target

[Service]
Type=forking

User=$USER
Group=$USER

Environment="JAVA_HOME=$JAVA_HOME"
Environment="CATALINA_PID=/opt/tomcat/temp/tomcat.pid"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_BASE=/opt/tomcat"
Environment="CATALINA_OPTS=-Xms512M -Xmx1024M -server -XX:+UseParallelGC"
Environment="JAVA_OPTS=-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom"

ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and start Tomcat service
echo "Reloading systemd and starting Tomcat service..."
sudo systemctl daemon-reload
sudo systemctl start tomcat
sudo systemctl enable tomcat

# Confirm that Tomcat is running
echo "Checking Tomcat status..."
sudo systemctl status tomcat

echo "Tomcat installation and setup is complete."