import React from "react";
import "./styles.css";
import propTypes from "prop-types";
import numberFormatter from "number-formatter";
import plural from "plural-ru";

const CartLayout = ({ store, itemAmount, itemPrice, handleClose }) => {
  return (
    <div className='modal-wrapper'>
      
      <div className='Cart'>
        <div className='Cart__head'>
          <h1>Корзина</h1>

          <button onClick={handleClose}>Закрыть</button>
        </div>
        <div className='Cart__body'>
          {store.cart.map((item) => (
            <div className='Cart-item'>
              <div className='Cart-item__number'>{item.code}</div>
              <div className='Cart-item__title'>{item.title}</div>

                <div className='Cart-item__price'>{numberFormatter("#,##0. ₽", item.price)}</div>
                <div className='Cart-item__amount'>{item.amount} шт</div>

            </div>
          ))}

          <div className='Cart__total-price'>
            <div className='Cart-item__check'>
              <b>Итого:</b>
            </div>
            <div className='Cart-item__price'>
              <b>{numberFormatter("#,##0. ₽", itemPrice)}</b>
            </div>
            <div className='Cart-item__amount'>
              <b>
                {itemAmount} шт
              </b>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-fade'/>
    </div>
  );
};

CartLayout.propTypes = {
  cart: propTypes.object.isRequired,
  handleClose: propTypes.func.isRequired,
};
CartLayout.defaultProps = {
  cart: {},
  handleClose: () => {},
};

export default CartLayout;
