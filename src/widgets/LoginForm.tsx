import "../shared/common-form.scss";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { gql, useMutation } from "@apollo/client";

export const LoginForm = () => {
  const {} = useMutation(LOGIN);
  // const setToken = useProfileStore((state) => state.setToken);
  // const [isFilled, setIsFilled] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const onSubmit = () => {};

  return (
    <div className="default-style">
      <form onSubmit={onSubmit}>
        <label htmlFor="login">Ваш логин</label>
        <input type="text" name="login" ref={loginRef} />
        <label htmlFor="password">Введите пароль</label>
        <input type="password" name="passwoord" ref={passRef} />
        <button type={"submit"}>Войти</button>
      </form>
    </div>
  );
};

const LOGIN = gql`
    mutation LogIn() {

    }
`;
