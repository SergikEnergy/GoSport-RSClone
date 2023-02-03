import './styles/styles1.scss';
const img = require('./assets/img/test-icon.png');

console.log('start');

document.body.innerHTML = `
<img src='${img}' alt='test icon'>
`;
