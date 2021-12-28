import React, { useState } from "react";
import propTypes from "prop-types";
import { cn } from "@bem-react/classname";
import "./styles.css";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import Textarea from "../../components/textarea";
import Select from "../../components/select";

function EditCard({ article, status, onSave, countries, categories }) {
  // CSS классы по БЭМ
  const className = cn("ArticleEdit");

  const [state, setState] = useState(article);

  const onChange = (name) => (value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const onSelect = (name) => (value) => {
    setState({
      ...state,
      [name]: { _id: value, _type: "string" },
    });
  };

  return (
    <div className={className()}>
      <form
        className={className("Form")}
        onSubmit={(e) => {
          e.preventDefault();
          {
            onSave(state);
          }
        }}
      >
        <div className={className("Field")}>
          Название
          <Input onChange={onChange("title")} value={state.title} theme="big" />
          {status?.id == "400.001" && (
            <p className="Error">{status.data?.issues["title.'ru'"]?.message}</p>
          )}
        </div>

        <div className={className("Field")}>
          Описание
          <Textarea value={state.description} onChange={onChange("description")} theme="big" />
          {status?.id == "400.001" && (
            <p className="Error">{status.data?.issues.description?.message}</p>
          )}
        </div>

        <div className={className("Field")}>
          Страна производитель
          <Select options={countries} value={state.maidIn?._id} onChange={onSelect("maidIn")} />
          {status?.id == "400.001" && (
            <p className="Error">{status.data?.issues.country?.message}</p>
          )}
        </div>

        <div className={className("Field")}>
          Категория
          <Select
            options={categories}
            value={state.category?._id}
            onChange={onSelect("category")}
          />
          {status?.id == "400.001" && (
            <p className="Error">{status.data?.issues.category?.message}</p>
          )}
        </div>

        <div className={className("Field")}>
          Год выпуска
          <Input onChange={onChange("edition")} value={state.edition} />
          {status?.id == "400.001" && (
            <p className="Error">{status.data?.issues.edition?.message}</p>
          )}
        </div>

        <div className={className("Field")}>
          Цена (₽)
          <Input onChange={onChange("price")} value={state.price} />
          {status?.id == "400.001" && <p className="Error">{status.data?.issues.price?.message}</p>}
        </div>

        <button type="submit" className={className("Submit")}>
          Сохранить
        </button>
      </form>
    </div>
  );
}

EditCard.propTypes = {
  article: propTypes.object.isRequired,
  onSave: propTypes.func,
};

EditCard.defaultProps = {
  article: {},
  onSave: () => {},
};

export default React.memo(EditCard);
