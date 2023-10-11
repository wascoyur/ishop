import { ApolloClient, InMemoryCache } from "@apollo/client";

const API = `http://cea3c11a3f62.vps.myjino.ru/graphql`;
export const client = new ApolloClient({
  uri: API,
  cache: new InMemoryCache(),
});
