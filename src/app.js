import React, { useCallback, useState } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import CartLayout from "./components/cart-layout";

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({ store }) {
  const callbacks = {
    onCreateItem: useCallback(() => store.createItem(), [store]),
    onSelectItem: useCallback((code) => store.selectItem(code), [store]),
    onAddToCart: useCallback((code) => store.addToCart(code), [store]),
  };

  const [isCartOpen, setCartState] = useState(false);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        itemAmount={store.getState().itemAmount}
        itemPrice={store.getState().itemPrice}
        handleOpen={() => setCartState(true)}
      />
      <List
        items={store.getState().items}
        onSelectItem={callbacks.onSelectItem}
        onAddToCart={callbacks.onAddToCart}
      />
      {isCartOpen ? (
        <CartLayout
          store={store.getState()}
          itemAmount={store.getState().itemAmount}
          itemPrice={store.getState().itemPrice}
          handleClose={() => setCartState(false)}
        />
      ) : null}
    </Layout>
  );
}

export default App;
