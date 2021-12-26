import StoreModule from "../module";

class CountriesStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load() {
    const response = await fetch(`api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      waiting: false,
    });

  }
}

export default CountriesStore;
