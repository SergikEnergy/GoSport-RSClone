import './styles/main.scss';
import { createElement } from './mvc/view/template/createElement';
import { renderHeader } from './mvc/view/header/header';
import { renderFooter } from './mvc/view/footer/footer';
import router from './mvc/model/Routing/router';
console.log('start');

const body = document.body;
renderHeader(body);
// Listen on hash change:
window.addEventListener('hashchange',router)

// Listen on page load:
window.addEventListener('DOMContentLoaded', router);


createElement('main', body);

renderFooter(body);
