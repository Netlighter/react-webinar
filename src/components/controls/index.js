import React, { useCallback, useEffect } from "react";
import propTypes from "prop-types";
import "./styles.css";
import plural from "plural-ru";
import numberFormatter from "number-formatter";

function Controls({ itemAmount, itemPrice, handleOpen }) {
  return (
    <div className='Controls'>
      <span>В корзине:</span>
      <b>
        {itemAmount
          ? `${itemAmount} ${plural(itemAmount, "товар", "товара", "товаров")} / ${numberFormatter(
              "#,##0.₽",
              itemPrice
            )}`
          : "пусто"}
      </b>
      <button onClick={() => handleOpen()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onCreate: propTypes.func.isRequired,
  getCartAmount: propTypes.func.isRequired,
};

Controls.defaultProps = {
  onCreate: () => {},
  getCartAmount: () => {},
};

export default React.memo(Controls);
