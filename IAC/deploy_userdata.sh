#!/bin/bash
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
sudo apt-get install -y tomcat8
sudo systemctl start tomcat8
sudo systemctl enable tomcat8