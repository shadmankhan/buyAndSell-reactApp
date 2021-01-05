## Project - Buy And Sell Web Application.

### Technologies used:

Base: JavaScript

Frontend of the project is built by using React, Material_UI, HTML and CSS and most of all `JavaScript` and it's libraries (or npm packages).
Major packages used - `react`, `redux`, `material-ui`, `formik`, `lodash`, `react-router-dom`, `yup`, `axios`.

Backend of the project is built on Node Server, which uses express app to run.
Packages used - `express`, `dotenv`, `cors`, `mongoose`, and as a dev dependency `nodemon`.

Frontend:
- Reactjs, HTML5 and CSS3 are used create front-end base.
- Redux and redux-thunk, are used to manage local states of the components in the project.
- Axios and Native fetch are used for API integration.
- Formik and formik-material-ui packages are used to create form with npm package Yup for validations.
- LoDashStatic is a light weighted javascript utility library.
- `react-router-dom` is used for front-end routing.

Backend:
- For database, mongoDB has been used throught the project with `mongoose`.
- `dotenv` and `cors` are used to be able to access the environment variables and to prevent the URL interference from cross-origin.
- `nodemon` has been used as develop dependency, to make our server running while while continuous development.
- Express router is used for backend routing.


### Features

- User can register.
- User can login by using the credentials he used at the time of registration.
- All the validations has been handled at both, login and registration form.
- User can view all the products on the dashboard including the product he has added or also the products of other users who have posted.
- Products will have necessary information like their Price, Title, Image, Seller Info, Posted on.
- User can Add to Cart as many as product he'd like.
- Products in Cart, their Amount and Quantity has been managed and keep updating when user add or remove any product.
- User can log out from the App.


**belongs to [Shadman A Khan](https://github.com/shadmankhan/)**




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
