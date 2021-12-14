import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";

function Main() {
  const select = useSelector((state) => ({
    items: state.catalog.items,
    pageNumber: state.catalog.pageNumber,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(1);
  }, []);

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

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum} />
      <List items={select.items} renderItem={renders.item} />
      <Paginator pageNumber={select.pageNumber} load={store.catalog.load} />
    </Layout>
  );
}

export default React.memo(Main);
