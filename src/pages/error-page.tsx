import { NavLink } from "react-router-dom";
import "../shared/error-page-style.scss";

export function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Ой... Случилась непредвиденная ошибка. Мы уже работаем над ее
        устранением.
      </p>

      <p>
        <NavLink to="/">Вернуться на стартовую</NavLink>
      </p>
    </div>
  );
}
