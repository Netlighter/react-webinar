import React, { useCallback, useEffect } from "react";
import Layout from "../layout";
import { Link, useParams } from "react-router-dom";
import BasketSimple from "../basket-simple";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Item from "../item";
import "./styles.css";

const ItemArticle = () => {
  const select = useSelector((state) => ({
    items: state.articles.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { articleId } = useParams();

  useEffect(async () => {
    await store.articles.load(articleId);
  }, [articleId]);

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

      <div className="article" style={{}}>
        <div className="article__description">{articles.description}</div>
        <div className="article__maidIn">
          Страна производитель:
          <b>
            {articles.maidIn?.title} ({articles.maidIn?.code})
          </b>
        </div>
        <div className="article__category">
          Категория: <b>{articles.category?.title}</b>
        </div>
        <div className="article__edition">
          Год выпуска: <b>{articles.edition}</b>
        </div>
        <div className="article__price">
          <h3>
            <b>Цена: {articles.price}₽</b>
          </h3>
        </div>
        <button onClick={() => callbacks.addToBasket(articleId)}>Добавить</button>
      </div>
    </Layout>
  );
};

export default ItemArticle;
