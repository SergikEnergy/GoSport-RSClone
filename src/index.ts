
import './styles/styles1.scss';
import router from './MVC/model/Routing/router'
console.log('start');
// Listen on hash change:
window.addEventListener('hashchange',router)

// Listen on page load:
window.addEventListener('DOMContentLoaded', router);
