import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { useConfirmUserRegisterMutation } from "../../generated/graphql";
import { useEffect } from "react";

export const CONFIRM_USER_REGISTER = gql`
  mutation ConfirmUserRegister($token: String!) {
    confirmUser(token: $token)
  }
`;

const ConfirmUserRegisterPage = () => {
  const { query } = useRouter();
  const token = (query.token as string) || "";

  const [
    confirmUserRegister,
    { data, error, loading },
  ] = useConfirmUserRegisterMutation({
    variables: { token },
  });

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await confirmUserRegister();
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [token]);

  if (error) return <div>Error...</div>;

  if (loading && !data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Confirm Password</h1>
      <div>
        {data?.confirmUser ? (
          <div>Вы успешно подтвердили</div>
        ) : (
          <div>Токен неверный либо истек.</div>
        )}
      </div>
    </div>
  );
};

export default ConfirmUserRegisterPage;
