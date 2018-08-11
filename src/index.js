import stringUpper from './upper';

const app = document.getElementById('app');

app.innerHTML = `Hello ${stringUpper('webpack')}!`;
