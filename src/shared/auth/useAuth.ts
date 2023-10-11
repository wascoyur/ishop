import { gql, useMutation } from "@apollo/client";

type logIn = { login: string; password: string };

const LOGIN = gql`
  mutation Signin($email: String) {
    token
  }
`;
export const useAuth = (props: logIn) => {
  const [token, error] = useMutation(LOGIN, {
    variables: { email: props.login, password: props.password },
  });

  return { token, error };
};
