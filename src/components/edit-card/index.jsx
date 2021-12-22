import React, { useState } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";
import { Link } from "react-router-dom";

function EditCard({ article, onSave }) {
  // CSS классы по БЭМ
  const className = cn("ArticleEdit");

  const [state, setState] = useState(article);

  console.log(state);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e);
  };

  return (
    <div className={className()}>
      <form className={className("Form")} action="url">
        <div className={className("Field")}>
          Название
          <input value={state.title} name="title" type="text" onChange={onChange} />
        </div>

        <div className={className("Field")}>
          Описание
          <textarea value={state.description} name="description" onChange={onChange} />
        </div>

        <div className={className("Field")}>
          Страна производитель
          <select name="country">
            {/* {countriesList.map((country) => 
              <option
                classnames
                value={country.title}
                id={country.id}
                selected={country.title === article.maidIn?.title ? true : false}
              >
                {country.title}
              </option>
            )} */}
            <option value={state.maidIn?.title} selected="true" id="select-1640092838744-0">
              {state.maidIn?.title}
            </option>
            <option value="option-2" id="select-1640092838744-1">
              Option 2
            </option>
            <option value="option-3" id="select-1640092838744-2">
              Option 3
            </option>
          </select>
        </div>

        <div className={className("Field")}>
          Категория
          <select name="category">
            <option value={state.category?.title} selected="true" id="select-1640092838744-0">
              {state.category?.title}
            </option>
            <option value="option-2" id="select-1640092838744-1">
              Option 2
            </option>
            <option value="option-3" id="select-1640092838744-2">
              Option 3
            </option>
          </select>
        </div>

        <div className={className("Field")}>
          Год выпуска
          <input value={state.edition} name="edition" onChange={onChange} />
        </div>

        <div className={className("Field")}>
          Цена (₽)
          <input value={state.price} name="price" onChange={onChange} />
        </div>

        <button onSubmit={(state) => onSave(state)}>Сохранить</button>
      </form>
    </div>
  );
}

EditCard.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func,
};

EditCard.defaultProps = {
  article: {},
  onAdd: () => {},
};

export default React.memo(EditCard);
