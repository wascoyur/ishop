import "../shared/common-form.scss";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const LoginForm = () => {
  // const setToken = useProfileStore((state) => state.setToken);
  // const [isFilled, setIsFilled] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (login.length > 0 && password.length > 0) {
  //     setIsFilled(true);
  //     return;
  //   }
  //   setIsFilled(false);
  // }, [login, password]);
  // const handleLogInUser = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (login === "admin" && password === "admpass") {
  //     setToken(login);
  //     return;
  //   }
  //   if (login === "user" && password === "password") {
  //     setToken(login);
  //     return;
  //   }

  navigate("/register");

  return (
    <div className="default-style">
      <form onSubmit={handleLogInUser}>
        <label htmlFor="login">Ваш логин</label>
        <input type="text" name="login" ref={loginRef} />
        <label htmlFor="password">Введите пароль</label>
        <input type="password" name="passwoord" ref={passRef} />
        <button type={"submit"} disabled={!isFilled}>
          Войти
        </button>
      </form>
    </div>
  );
};
