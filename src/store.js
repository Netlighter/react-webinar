class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter((item) => item !== callback);
    };
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map((item) => item.code)) + 1;
    this.setState({
      items: this.state.items.concat({
        code,
        title: "Новая запись №" + code,
      }),
      cart: this.state.cart,
      itemAmount: this.getCartAmount(),
      itemPrice: this.getCartPrice(),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      items: this.state.items.filter((item) => item.code !== code),
      cart: this.state.cart,
      itemAmount: this.getCartAmount(),
      itemPrice: this.getCartPrice(),
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      items: this.state.items.map((item) => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      }),
      cart: this.state.cart,
      itemAmount: this.getCartAmount(),
      itemPrice: this.getCartPrice(),
    });
  }

  getCartAmount() {
    let amount = 0;
    this.state.cart.map((item) => {
      amount = amount + item.amount;
    });
    return amount;
  }
  // todo залупа с id какая-то
  getCartPrice() {
    let price = 0;
    this.state.cart.map((item) => {
      //супердупермегакрутой метод поиска цены по items!
      price = price + Number(this.state.items.find((i) => i.title === item.title).price) * item.amount;
    });
    console.log(price);
    return price;
  }

  addToCart(code) {
    let foundItem = this.state.items.find((i) => i.code === code);
    let itemIndex = this.state.cart.findIndex((i) => i.title === foundItem.title);

    if (itemIndex != -1) {
      this.setState({
        items: this.state.items,
        cart: this.state.cart.map((item) => {
          if (item.title === foundItem.title) item.amount = item.amount + 1;
          return item;
        }),
        itemAmount: this.getCartAmount(),
        itemPrice: this.getCartPrice(),
      });
    } else
      this.setState({
        items: this.state.items,
        cart: this.state.cart.concat({
          code: foundItem.code,
          title: foundItem.title,
          price: foundItem.price,
          amount: 1
        }),
        itemAmount: this.getCartAmount(),
        itemPrice: this.getCartPrice(),
      });
    console.log(this.state);
  }
}

export default Store;
