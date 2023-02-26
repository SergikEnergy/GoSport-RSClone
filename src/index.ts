import './styles/main.scss';

// import router from './mvc/model/Routing/router';
console.log('start');

// // Listen on hash change:
// window.addEventListener('hashchange', router);

// // Listen on page load:
// window.addEventListener('DOMContentLoaded', router);

import App from './mvc/app/app';

const app = new App();
app.renderBaseElements();
app.run();

//Main
//Events
//Profiles
