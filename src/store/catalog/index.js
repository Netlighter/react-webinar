import StoreModule from "../module";

class CatalogStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      pageNumber: 1,
      limit: 10,
      count: 0
    };
  }

  /**
   * Загрузка списка товаров
   */
  load = async (page, limit) => {
    const response = await fetch(
      `/api/v1/articles?lang=ru&limit=${limit}&skip=${10 * (page - 1)}&fields=items(*),count`
    );
    const json = await response.json();
    this.setState({
      ...this.initState(),
      items: json.result.items,
      pageNumber: page,
      count: json.result.count
    });
  };
}

export default CatalogStore;
