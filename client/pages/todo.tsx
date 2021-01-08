import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { FormEvent, useState } from "react";
import {
  GetAllTodosQuery,
  useAddTodoMutation,
  useGetAllTodosQuery,
} from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const GET_ALL_TODOS = gql`
  query GetAllTodos {
    getAllTodos {
      id
      title
      description
      isCompleted
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String!) {
    addTodo(title: $title, description: $description) {
      id
      title
      description
      isCompleted
    }
  }
`;

const TodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data } = useGetAllTodosQuery();
  const [addTodo] = useAddTodoMutation({
    update(cache, { data }) {
      const newTodoFromResponse = data?.addTodo;
      const existingTodos = cache.readQuery({
        query: GET_ALL_TODOS,
      }) as GetAllTodosQuery;

      const todos = existingTodos.getAllTodos || [];

      console.log(existingTodos);

      cache.writeQuery({
        query: GET_ALL_TODOS,
        data: {
          getAllTodos: [...todos, newTodoFromResponse],
        },
      });
    },
  });

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    addTodo({
      variables: {
        title,
        description,
      },
    });
  };

  if (!data) return null;

  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(evt) => setTitle(evt.target.value)}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(evt) => setDescription(evt.target.value)}
        />
        <br />
        <button type="submit">Add Todo</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_TODOS,
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

export default TodoPage;
