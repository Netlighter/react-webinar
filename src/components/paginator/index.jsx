import React, { useEffect } from "react";
import propTypes from "prop-types";
import "./styles.css";

function Paginator({ pageNumber, load }) {
  const pages = [1, 2, 3, 4, 5];

  const handleClick = async (e) => {
    e.preventDefault();
    await load(e.target.dataset.page);
  };

  return (
    <div className="Paginator">
      {pages.map((page) => (
        <a
          data-page={page}
          className={`Paginator__item ${pageNumber == page && "Paginator__item--selected"}`}
          onClick={(page) => handleClick(page)}
          key={page}
        >
          {page}
        </a>
      ))}
    </div>
  );
}

Paginator.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func,
};

Paginator.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString();
  },
};

export default React.memo(Paginator);
