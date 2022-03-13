# Comon Case Study

### Setup

Using good old `NPM`

Install dependencies
```sh
$ npm install
```
How to run development server(http://server:3000)
```sh
$ npm start
```
How to run unit tests
```sh
$ npm test
```

Using `Yarn`

Install dependencies
```sh
$ yarn
```
How to run development server(http://server:3000)
```sh
$ yarn start
```
How to run unit tests
```sh
$ yarn test
```

**Make sure to add the working api url in the `config.js` file**
### High Level solution and decisions
* Built on top of the React js. Used create-react-app as the boiler plate.
* Use [Emotion](https://emotion.sh/docs/introduction) to create styled components. This library was selected to maintain the simplicity and much easier to change styles based on the props.
* Use [React query](https://react-query.tanstack.com/overview) for data fetching management. This library is supporting caching, synchronizing and updating server state, support both GraphQL and REST APIs and many more.
* [Axios](https://www.npmjs.com/package/axios) for access the backend API.
* [Lodash Debounce](https://www.npmjs.com/package/lodash.debounce) for debounce the search input text. Default value 300ms.
* [React Router](https://reactrouter.com/docs/en/v6/getting-started/overview) for routing.
* [React Testing library](https://www.npmjs.com/package/react-input-range) for unit testing.
* [Eslint](https://eslint.org/) for code linting.
* `src/config.js` file for global configurations.
* `Local Storage` for save the user session.
* Web application is responsive to support mobile and tab devices.

### What I can improve further
*   More unit tests.
*   Increase the code comments.
*   Improve Accessability attributes.
*   Improve UI/UX.
*   Introduce story book for common component.

### Few screenshots for desktop and mobile views

![comeon-test-mobile-view](https://i.ibb.co/qxNhMFR/Screenshot-2022-03-13-at-10-19-20-PM.png)
![comeon-test-desktop-view-login](https://i.ibb.co/fqbWXVN/Screenshot-2022-03-13-at-10-24-08-PM.png)
![comeon-test-desktop-view](https://i.ibb.co/JkW48Rr/Screenshot-2022-03-13-at-10-19-58-PM.png)
