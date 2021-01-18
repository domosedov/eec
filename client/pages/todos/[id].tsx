import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import {
  addApolloState,
  initializeApollo,
} from "../../lib/apollo/apolloClient";
import { gql } from "@apollo/client";
import { useGetTodoByIdQuery } from "../../generated/graphql";

export const GET_TODO = gql`
  query GetTodoById($id: ID!) {
    todo(id: $id) {
      id
      title
      description
      isCompleted
    }
  }
`;

const SingleTodoPage = () => {
  const { query } = useRouter();
  const id = query.id as string;
  const { data } = useGetTodoByIdQuery({
    variables: { id },
  });

  return (
    <div>
      <h1>Single Todo Page {id}</h1>
      <Link href="/todos">
        <a>All todos</a>
      </Link>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;

  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_TODO,
      variables: { id },
    });
  } catch (e) {
    console.log(e)
  }

  return addApolloState(apolloClient, {
    props: {},
  });
};

export default SingleTodoPage;
