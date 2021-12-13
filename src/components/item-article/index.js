import React, { useCallback, useEffect } from "react";
import Layout from "../layout";
import { Link, useParams } from "react-router-dom";
import BasketSimple from "../basket-simple";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Item from "../item";
import "./styles.css";

const ArticleLayout = () => {
  const select = useSelector((state) => ({
    items: state.articles.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const { articleId } = useParams();
  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.articles.load(articleId);
  }, [store]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };
  const { articles } = store.getState();

  return (
    <Layout head={<h1>{articles.title}</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />

      <div className="Article" style={{}}>
        <div className="Article__item Description">{articles.description}</div>
        <div className="Article__item MaidIn">
          Страна производитель:
          <b>
            {articles.maidIn?.title} ({articles.maidIn?.code})
          </b>
        </div>
        <div className="Article__item Category">
          Категория: <b>{articles.category?.title}</b>
        </div>
        <div className="Article__item Edition">
          Год выпуска: <b>{articles.edition}</b>
        </div>
        <div className="Article__item Price">
          <h3>
            <b>Цена: {articles.price}₽</b>
          </h3>
        </div>
        <button onClick={() => callbacks.addToBasket(articleId)}>Добавить</button>
      </div>
    </Layout>
  );
};

export default ArticleLayout;
