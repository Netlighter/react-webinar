import React from "react";
import ReactDOM from "react-dom";
import Store from "./store.js";
import App from "./app.js";

const root = document.getElementById("app");

console.log('index.js');

// Состояние приложения
const store = new Store({
  items: [
    { code: 1, title: "Название элемента", highlight: 0 },
    { code: 2, title: "Некий объект", highlight: 0 },
    { code: 3, title: "Заголовок", highlight: 0 },
    { code: 4, title: "Короткое название", highlight: 0 },
    { code: 5, title: "Запись", highlight: 0 },
    { code: 6, title: "Пример названия", highlight: 0},
    { code: 7, title: "Седьмой", highlight: 0 },
  ],
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store} />, root);
