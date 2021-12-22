import StoreModule from "../module";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      countries: {},
      waiting: true,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(id) {
    this.updateState({
      waiting: true,
      data: {},

    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
      );
      const json = await response.json();

     
      if (json.error) throw new Error(json.error);

      this.updateState({
        data: json.result,
        waiting: false,
      });
    } catch (e) {
      this.updateState({
        data: {},
        waiting: false,
      });
    }
  }

  async loadCountries() {
    const countries = await fetch(
      `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    );
    //setState

  }

  async postOnSave(localData) {
    console.log(localData)

    // const response = await fetch(`/api/v1/articles/${_id}`,{
    //   method: 'PUT',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify(
    //     {
    //       "_id": "61c0a9cb8f67e811d55abb40",
    //       "title": "Товар #11",
    //       "description": "Описание товара из множества букв",
    //       "price": 3970.52,
    //       "maidIn": {
    //         "_id": "61c0a9b58f67e811d55ab056"
    //       },
    //       "edition": 2011,
    //       "category": {
    //         "_id": "61c0a9cb8f67e811d55abb32"
    //       }
    //     }
    //   )
    // }
    
    // )
  }

}

export default ArticleStore;
