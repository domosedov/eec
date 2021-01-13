import Link from "next/link";
import { gql, Reference } from "@apollo/client";
import { GetStaticProps } from "next";
import { FormEvent, useState } from "react";
import {
  useAddTodoMutation,
  useGetAllTodosQuery,
  useNewTodoSubscription,
} from "../../generated/graphql";
import {
  addApolloState,
  initializeApollo,
} from "../../lib/apollo/apolloClient";

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      id
      title
      description
      isCompleted
    }
  }
`;

export const NEW_TODO = gql`
  subscription newTodo {
    newTodo {
      id
      title
      description
    }
  }
`;

export const ADD_TODO = gql`
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
  const { data, loading, error } = useGetAllTodosQuery();
  const { data: subscriptionData } = useNewTodoSubscription();
  const [addTodo] = useAddTodoMutation({
    update(cache, { data }) {
      const newTodoFromResponse = data?.addTodo;

      cache.modify({
        fields: {
          todos(existingTodoRefs: Reference[] = [], { toReference }) {
            if (newTodoFromResponse) {
              const newTodoRef = toReference(newTodoFromResponse);

              return [...existingTodoRefs, newTodoRef];
            }
          },
        },
      });
    },
  });

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    await addTodo({
      variables: {
        title,
        description,
      },
    });
  };

  if (error) return <div>Error....</div>;

  if (loading && !data) return <div>Loading...</div>;

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
      {data?.todos &&
        data?.todos.map((todo) => (
          <li key={todo.id}>
            <Link href={`/todos/${todo.id}`}>
              <a>{todo.title}</a>
            </Link>
          </li>
        ))}
      <div>
        <h2>Subscribe</h2>
        <pre>{JSON.stringify(subscriptionData, null, 2)}</pre>
      </div>
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
