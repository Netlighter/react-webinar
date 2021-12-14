import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      pageNumber: 1,
    };
  }

  /**
   * Загрузка списка товаров
   */
  load = async (page) => {
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=10&skip=${10 * (page - 1)}&fields=%2A`
    );
    const json = await response.json();
    this.setState({
      ...this.initState(),
      items: json.result.items,
      pageNumber: page,
    });
  };
}

export default CatalogStore;
