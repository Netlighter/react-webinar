import { errorFormat } from "../../utils/error-format";
import StoreModule from "../module";

class ArticleStore extends StoreModule {
  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {},
      status: {},
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
      status: {}
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

  async update(data) {
    this.setState({ ...this.getState(), status: {} });

    console.log(data)

    try {
      const response = await fetch(`/api/v1/articles/${data._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      const { result, error } = await json;
      if (error) {
        this.setState({
          ...this.getState(),
          status: {
            ...error,
            data: { ...error, issues: errorFormat(error.data.issues, "path") },
          },
        });
      } else {
        this.setState({ ...this.getState(), data: { ...result } });
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ArticleStore;
