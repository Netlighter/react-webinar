import React from "react";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import { Route, Routes } from "react-router-dom";
import Article from "./article";

/**
 * Приложение
 */
function App() {
  const select = useSelector((state) => ({
    name: state.modals.name,
  }));

  return (
    <div>
      <Routes>
        <Route
          path={"/"}
          element={
            <>
              <Main />
            </>
          }
        />
        <Route
          path={"/article/:articleId"}
          element={
            <>
              <Article />
            </>
          }
          />
      </Routes>
      {select.name === "basket" && <Basket />}{" "}
    </div>
  );
}

export default React.memo(App);
