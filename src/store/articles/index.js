import StoreModule from "../module";

class ArticleStore extends StoreModule {
  initState() {
    return {
      items: {},
    };
  }

  async load(_id) {
    this.setState({ ...this.initState() });

    const response = await fetch(`/api/v1/articles/${_id}?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json()
      
    this.setState({ ...json.result });
  }
}

export default ArticleStore;
