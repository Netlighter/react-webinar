import React, { useCallback } from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import EditCard from "../../components/edit-card";

function Edit() {
  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(async () => {
    await store.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    onSave: useCallback((localData) => store.article.postOnSave(localData), [store]),
    getCountries: useCallback(() => store.article.getCountries(), [store]),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Header />

      <Spinner active={select.waiting}>
        <EditCard article={select.article} onSave={callbacks.onSave} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Edit);
