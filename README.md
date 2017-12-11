# ng-full

Prerequisites

Install Node.js and MongoDB
Install Angular CLI: npm i -g @angular/cli
From project root folder install all the dependencies: npm i
Run

Development mode

npm run dev: concurrently execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at localhost:4200. Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

Production mode

npm run prod: run the project with a production bundle and AOT compilation listening at localhost:3000

Deploy (Heroku)

Go to Heroku and create a new app (eg: your-app-name)
Install Heroku CLI
heroku login
mkdir your-app-name && cd your-app-name
git init
heroku git:remote -a your-app-name
Download this repo and copy all files into your-app-name folder
npm i
Edit package.json as following:
add this line to scripts: "postinstall": "tsc -p server && ng build -aot -prod"
move the following packages from devDependencies to dependencies: @angular/cli, @angular/compiler-cli, @types/jasmine, @types/node, chai, chai-http and typescript.
Edit .env and replace the MongoDB URI with a real remote MongoDB server. You can create a MongoDB server with Heroku or mLab.
git add .
git commit -m "Going to Heroku"
git push heroku master
heroku open and a window will open with your app online
