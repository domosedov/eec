import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useMeQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      login
      email
      registeredAt
      role
    }
  }
`;

export default function MePage() {
  const { data, error, loading } = useMeQuery();

  if (error) return <div>Error...</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Me Page</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ME_QUERY,
    context: {
      headers: {
        cookie: ctx.req.headers.cookie,
      },
    },
  });

  return addApolloState(apolloClient, {
    props: {},
  });
};
