import React, { useCallback, useEffect } from "react";
import "./styles.css";

function LayoutArticle({article, articleId, addToBasket}){
  return (
      <div className="article" style={{}}>
        <div className="article__description">{article.description}</div>
        <div className="article__maidIn">
          Страна производитель:
          <b>
            {article.maidIn?.title} ({article.maidIn?.code})
          </b>
        </div>
        <div className="article__category">
          Категория: <b>{article.category?.title}</b>
        </div>
        <div className="article__edition">
          Год выпуска: <b>{article.edition}</b>
        </div>
        <div className="article__price">
          <h3>
            <b>Цена: {article.price}₽</b>
          </h3>
        </div>
        <button onClick={() => addToBasket(articleId)}>Добавить</button>
      </div>
  );
};

export default LayoutArticle;
