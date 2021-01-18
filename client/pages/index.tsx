import {MouseEvent} from 'react'
import Link from "next/link";
import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../lib/apollo/apolloClient";
import { useGetAllUsersQuery, useLogoutMutation } from "../generated/graphql";
import { NextSeo } from "next-seo";

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      login
      email
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export default function Home() {
  const [logout, { client }] = useLogoutMutation();

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    await logout();
    await client.resetStore();
  };

  const { data, loading, error } = useGetAllUsersQuery();

  if (error) return <div>Error...</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <NextSeo title="Главная" />
      <section className="bg-white text-black dark:bg-black dark:text-white">
        <h1>Main content</h1>

        <Link href="/user/login">
          <a>Login Page</a>
        </Link>

        <Link href="/user/register">
          <a>Регистрация</a>
        </Link>

        <Link href="/me">
          <a>Me Page</a>
        </Link>

        <button
          onClick={handleLogoutClick}
          className="bg-red-400 px-4 py2 rounded"
        >
          Logout
        </button>

        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_USERS,
  });

  return addApolloState(apolloClient, {
    props: {
      foo: "bar",
    },
    revalidate: 1,
  });
};
