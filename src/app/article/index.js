import React, { useCallback, useEffect } from "react";
import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import LayoutArticle from "../../components/layout-article";

const Article = () => {
  const select = useSelector((state) => ({
    items: state.articles.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const { articleId } = useParams();

  const limit = 10;

  useEffect(async () => {
    await store.articles.load(articleId, limit);
  }, [articleId]);

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open("basket"), [store]),
  };

  const { articles } = store.getState();

  return (
    <Layout head={<h1>{articles.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <LayoutArticle 
      article={articles} 
      articleId={articleId} 
      addToBasket={callbacks.addToBasket} 
      />
    </Layout>
  );
};

export default Article;
