#!/bin/bash
# Bash script to setup Chapp project.
echo "Installing NPM dependencies..."
npm install ; cd ./client ; npm install
echo "Creating build directory..."
npm run build ; cd ../
echo "Running sequelize commands for creating the database and tables..."
sequelize db:create ; npx sequelize-cli db:migrate
echo "You should be ready to go. Run 'npm run server' to start the server and navigate in your browser to the specified port. Have fun. "