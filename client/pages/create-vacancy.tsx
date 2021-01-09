import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { addApolloState, initializeApollo } from "../lib/apolloClient";

const GET_FORM_ = gql``;

const CreateVacancy = () => {
  return (
    <div>
      <h1>Создать заявку</h1>
    </div>
  );
};

export default CreateVacancy;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_FORM_,
    });
  } catch (err) {
    console.log(err);
  }

  return addApolloState(apolloClient, {
    props: {},
  });
};
