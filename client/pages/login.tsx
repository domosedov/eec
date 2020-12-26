import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { ME_QUERY } from "./me";

const LOGIN_MUTATION = gql`
  mutation Login($password: String!, $loginOrEmail: String!) {
    login(password: $password, loginOrEmail: $loginOrEmail) {
      login
      email
      registeredAt
      role
    }
  }
`;

export default function Login() {
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    await login({ variables: { loginOrEmail, password } });
  };

  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <div>
      <h1>Login Page</h1>
      <Link href="/">
        <a>Home Page</a>
      </Link>

      <Link href="/me">
        <a>Me Page</a>
      </Link>
      <form onSubmit={handleSubmit}>
        Login or Email:
        <input
          type="text"
          value={loginOrEmail}
          onChange={(evt) => setLoginOrEmail(evt.target.value)}
        />
        Password:
        <input
          type="text"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type="submit">Войти</button>
      </form>

      {data && <div>{JSON.stringify(data, null, 2)}</div>}
    </div>
  );
}
