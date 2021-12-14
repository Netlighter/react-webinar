import StoreModule from "../module";

class ArticleStore extends StoreModule {
  initState() {
    return {
      items: {},
    };
  }

  getCountries = async (data) => {
    const request = await fetch(`api/v1/countries/${data.maidIn._id}`);
    return await request.json();
  };
  getCategories = async (data) => {
    const request = await fetch(`/api/v1/categories/${data.category._id}`);
    return await request.json();
  };

  async load(_id) {
    this.setState({ ...this.initState() });

    const response = await fetch(`/api/v1/articles/${_id}`);

    const json = await response
      .json()
      .then(async ({ result }) => {
        const byCountry = await this.getCountries(result);

        return { ...result, maidIn: { ...byCountry.result } };
      })
      .then(async (data) => {
        const byCategory = await this.getCategories(data);

        return { ...data, category: { ...byCategory.result } };
      });

    this.setState({ ...json });
  }
}

export default ArticleStore;
