import { gql } from "@apollo/client";
import {
  RegisterInput,
  useUserRegisterMutation,
} from "../../generated/graphql";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";

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
    .matches(
      /^[a-zA-Z0-9]{3,16}$/,
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
  const [showPassword, setShowPassword] = useState(false);
  const [userRegister, { loading, data, error }] = useUserRegisterMutation({
    onError: (err) => console.dir(err),
  });
  const { register, handleSubmit, errors: formErrors } = useForm<RegisterInput>(
    {
      resolver: yupResolver(schema),
      mode: "onBlur",
    }
  );
  const onSubmit = async (data: RegisterInput) => {
    await userRegister({
      variables: { data },
    });
  };

  if (error) return <div>Error...</div>;

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        Login
        <input type="text" name="login" defaultValue="" ref={register} />
        <br />
        Email
        <input type="text" name="email" defaultValue="" ref={register} />
        <br />
        Password
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          defaultValue=""
          ref={register}
          autoComplete="off"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          Show Password
        </button>
        <br />
        <button type="submit">Register</button>
      </form>
      <div>
        <pre>{JSON.stringify(formErrors, null, 2)}</pre>
      </div>
      <div>
        {loading && !data && <div>Loading...</div>}
        {/*{JSON.stringify(data, null, 2)}*/}
      </div>
    </div>
  );
};

export default RegisterPage;
