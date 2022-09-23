# Q-and-A-server
Deployment Instructions:
Create Database

Sign into AWS console and create a new EC2 instance.

Download the following packages:

Node.js and npm

  sudo apt update
  sudo apt install nodejs npm
Confirm successful install:

  node --version
  npm --version
MongoDB

  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

  sudo apt-get update

  sudo apt-get install -y mongodb-org
  
See more details in the official MongoDB documentation. Instructions for troubleshooting issues.

Mongosh

  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

  sudo apt-get update

  sudo apt-get install -y mongodb-mongosh
  
Install MongoDB Database Tools:

sudo dpkg -l mongodb-database-tools

Start MongoDB:

  sudo service mongod start
  
Verify process started successfully:

  sudo service mongod status

Create reviews database with Mongosh:

  mongosh
  
  use reviews;
  
OPTION #1: Build the database from source files

Load data into database:

  npm run parser

  
Confirm data loaded and transformed correctly:


OPTION #2: Use MongoDB Utilities to copy the database from local to remote EC2

Dump the MongoDB with mongodump from your local machine:


  cd /data/backup
  
  mongodump -d=qanda
  
Transfer the dumped MongoDB by connecting to remote EC2 instance.

  - move key to same folder as data/dump.
  - create data folder in instance.
  
  scp -i SDC-key.pem -r qanda ubuntu@ec2-54-196-8-197.compute-1.amazonaws.com:~/data
  
Restore the MongoDB on the remote EC2 instance from the MongoDB dump.

  cd data
  mongorestore -d=qanda qanda
  
Create API Server

Sign into AWS console and create a new EC2 instance.

Download the following packages:

Node.js and npm

  sudo apt update
  
  sudo apt install nodejs npm
  
Confirm successful install:

  node --version
  npm --version
  
Clone the Q-and-A API repository.
  git clone <git repo link>
