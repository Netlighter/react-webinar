import StoreModule from "../module";
import { generateTree, addPrefix } from "../../utils/tree-select";

class CategoriesStore extends StoreModule {
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
    const response = await fetch(`api/v1/categories?limit=*&fields=_id,parent,title`);
    const json = await response.json();
    const itemsTree = addPrefix(generateTree(json.result.items));

    this.setState({
      ...this.getState(),
      items: itemsTree,
    });

  }
}

export default CategoriesStore;
