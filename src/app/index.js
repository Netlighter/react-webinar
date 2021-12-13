import React from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Route, Routes } from "react-router-dom";
import ItemArticle from "../components/item-article";

/**
 * Приложение
 */
function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <>
            <Main />
            {select.name === "basket" && <Basket />}
          </>
        }
      />
      <Route
        path={"/article/:articleId"}
        element={
          <>
            <ItemArticle />
            {select.name === "basket" && <Basket />}{" "}
          </>
        }
      />
    </Routes>
  );
}

export default React.memo(App);
