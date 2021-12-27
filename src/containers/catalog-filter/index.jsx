import React, { useCallback, useMemo } from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import { generateTreeArray, generateSelectArray } from "../../utils/tree-select";

function CatalogFilter() {
  const store = useStore();

  const select = useSelector((state) => ({
    sort: state.catalog.params.sort,
    category: state.catalog.params.category,
    categories: state.categories.items,
    query: state.catalog.params.query,
  }));

  // Опции для полей
  const options = {
    sort: useMemo(
      () => [
        { value: "key", title: "По коду" },
        { value: "title.ru", title: "По именованию" },
        { value: "-price", title: "Сначала дорогие" },
        { value: "edition", title: "Древние" },
      ],
      []
    ),
    categories: useMemo(() => {
      const flat = generateTreeArray(select.categories);
      const cleaned = generateSelectArray(flat);

      return [{ value: "", title: "Все" }, ...cleaned];
    }),
  };

  const callbacks = {
    onSort: useCallback((sort) => store.catalog.setParams({ sort }), [store]),
    onSearch: useCallback((query) => store.catalog.setParams({ query, page: 1 }), [store]),
    onChoose: useCallback((category) => store.catalog.setParams({ category, page: 1 }), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
  };

  return (
    <LayoutTools>
      <Select onChange={callbacks.onChoose} value={select.category} options={options.categories} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={"Поиск"} theme="big" />
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);