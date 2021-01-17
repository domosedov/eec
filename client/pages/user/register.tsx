import { gql, isApolloError } from "@apollo/client";
import {
  RegisterInput,
  useUserRegisterMutation,
} from "../../generated/graphql";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { ValidationError } from "../../types";
import { GRAPHQL_VALIDATION_FAILED } from "../../constants";
import TextInput from "../../components/layout/TextInput";
import PasswordInput from "../../components/layout/PasswordInput";
import Button from "../../components/layout/Button";

export const USER_REGISTER = gql`
  mutation UserRegister($data: RegisterInput!) {
    register(data: $data) {
      id
      login
      email
      role
      registeredAt
    }
  }
`;

const schema = Yup.object().shape({
  login: Yup.string()
    .lowercase()
    .min(1, "Логин не может быть пустым")
    .max(50, "Логин не может быть длиннее 50 символов")
    .matches(
      /^[a-zA-Z0-9]{1,50}$/,
      "Логин может содержать только латинские буквы и цифры"
    )
    .required("Это поле обязательное"),
  email: Yup.string()
    .lowercase()
    .email("Некорректный Email")
    .required("Это поле обязательное"),
  password: Yup.string()
    .min(1, "Пароль не может быть пустым")
    .matches(/^\S+$/, "Пароль не должен содержать пробелы")
    .required("Это поле обязательное"),
});

const RegisterPage = () => {
  const [userRegister, { loading, data, error }] = useUserRegisterMutation();
  const {
    register,
    handleSubmit,
    errors: formInputErrors,
    setError,
    reset,
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });
  const onSubmit = async (data: RegisterInput) => {
    try {
      const result = await userRegister({
        variables: { data },
      });

      if (result.data?.register) {
        /**
         * Если удалось зарегистрироваться, то
         * собросить инпуты и вывести сообщение
         */
        reset();
        // TODO: Add thank you message
      }
    } catch (err) {
      if (isApolloError(err)) {
        for (const gqlError of err.graphQLErrors) {
          if (gqlError.extensions?.code === GRAPHQL_VALIDATION_FAILED) {
            const validationErrors: ValidationError[] =
              gqlError.extensions?.exception?.validationErrors;
            if (Array.isArray(validationErrors)) {
              for (const fieldError of validationErrors) {
                setError(fieldError.property as keyof RegisterInput, {
                  message: fieldError.constraints
                    ? Object.values(fieldError.constraints).join("")
                    : "Неверное значение",
                });
              }
            }
          }
        }
      } else {
        console.error({ err });
      }
    }
  };

  if (
    error &&
    error.graphQLErrors.filter(
      (gqlErr) => gqlErr.extensions?.code !== GRAPHQL_VALIDATION_FAILED
    ).length > 0
  ) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="login"
          name="login"
          label="Логин"
          hasError={!!formInputErrors?.login}
          errorMessage={formInputErrors?.login?.message}
          ref={register}
        />
        <TextInput
          id="email"
          name="email"
          label="Email"
          hasError={!!formInputErrors?.email}
          errorMessage={formInputErrors?.email?.message}
          ref={register}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Пароль"
          hasError={!!formInputErrors?.password}
          errorMessage={formInputErrors?.password?.message}
          ref={register}
        />
        <Button type="submit">Отправить</Button>
      </form>
      <div>
        {loading && !data && <div>Loading...</div>}
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
};

export default RegisterPage;
