import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById("app");


// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Название товара', price: '100'},
    {code: 2, title: 'Книга по реакт', price: '770'},
    {code: 3, title: 'Хлеб', price: '43'},
    {code: 4, title: 'Трактор', price: '7654320'},
    {code: 5, title: 'Телефон UnPhone 2', price: '120000'},
    {code: 6, title: 'Карандаши цветные', price: '111'},
    {code: 7, title: 'Подарочек', price: '0'},
  ],
  cart: [],
  itemAmount: 0,
  itemPrice: 0
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store}/>, root);
