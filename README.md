# Chapp
## Chatting application.

Chapp is a minimalist messaging application. Some of its features are: 
- A Public Channel where all connected user can send and read messages.
- Private messaging.
- Emojis support.
- Authentication layer.
- Basic CRUD operations for user's information.
- Not persistent messages between sessions.

It consist of the following technologies for the backend: 
- Socket.IO\n
 Useful framework that allows us to transmit data in real time without the need of the common request/response flow of AJAX API. 
- Sequelize\n
 ORM for communicating with our Postgres database.
- Express.js\n
 Nodejs framework for building Javascript APIs.
- Passport.js\n
 For local authentication.

And for the frontend we used the following libraries:  
- React 
 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Antd
 Component library for react. It has several beautiful components available. 
- emoji-picker-react
 Basically a rich React component that simplifies the task of adding emojis to our application.

Check `package.json` (both in `/backend` and `/backend/client`) for more details. 
## Requirements to run the app:

#### Postgres
#### Nodejs
#### A Web Browser 

#### Add into `/backend` a .env file following as a guide the .env.example file.
#### If you are using a PORT different than `2021` you will have to modify `backend\client\src\requests\requests.js` path property in order to match the URI.
## Available Scripts

#### In /backend directory you can run:

### `npm run server`

Runs the server.js file using `nodemon` and `dotenv` dependencies. The `express` application serves the assets from the build directory (created after running `npm run build` command, this step is necessary to see the app working fully, see below for details).

#### In the project's client directory /backend/client, you can run:

### `npm start`

Runs the app in the development mode. This is not recommended since the application will not be synchronized with the backend and requests will not be successful <br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
There are no tests defined for this application.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
