import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useProfileStore } from "../../app/state.ts";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql/error";

const API = `https://cea3c11a3f62.vps.myjino.ru/graphql`;
export type Extensions = {
  code: string;
  field: string;
  value: string;
};
const PORT = 4042;
const HOST = "localhost";
const NOT_AUTHORIZED_CODE = "ERR_JWT_ERROR";
export const URL = `http://${HOST}:${PORT}`;
const httpLink = createHttpLink({ uri: API });

const authLink = setContext((_, { headers }) => {
  const [token] = useProfileStore((state) => [state.token, state.setToken]);
  return {
    headers: { ...headers },
    authorization: token ? `Bearer ${{ token }}` : "",
  };
});

export const getGraphqlErrorExtensions = (
  errors: readonly GraphQLError[],
): Extensions[] =>
  errors.map((err) => {
    const { extensions } = err;

    return extensions as Extensions;
  });
export const getErrorExtensions = (
  error: ErrorResponse,
): Extensions[] | null => {
  const { graphQLErrors } = error || {};
  if (graphQLErrors?.length) {
    return getGraphqlErrorExtensions(graphQLErrors);
  }
  return null;
};

const errorLink = onError((error: ErrorResponse) => {
  const setToken = useProfileStore((state) => state.setToken);
  const extensions = getErrorExtensions(error);
  if (extensions?.find((i) => i.code === NOT_AUTHORIZED_CODE)) {
    setToken("");
  }
});

const possibleTypes = {
  UserInterface: ["User", "Profile"],
  Animal: ["Cat", "Dog"],
};
export const client: ApolloClient<unknown> = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    possibleTypes,
  }),
});
