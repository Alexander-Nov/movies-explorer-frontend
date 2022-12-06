import React from "react";
import { useHistory } from "react-router-dom";

function Page404() {
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }

  return (
    <section className="page404">
      <h1 className="page404__title">404</h1>
      <p className="page404__text">Страница не найдена</p>
      <button className="page404__go-back-link" onClick={goBack}>Назад</button>
    </section>
  );
}

export default Page404;
