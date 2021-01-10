import { gql } from "@apollo/client";
import { GetStaticProps } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useGetFormOptionsQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../lib/apolloClient";
import TextInput from "../components/layout/TextInput";

const GET_FORM_OPTIONS = gql`
  query GetFormOptions {
    cities {
      id
      name
    }
    metros {
      id
      name
    }
    places {
      id
      name
    }
    subjects {
      id
      name
    }
    students {
      id
      name
    }
  }
`;

type Inputs = {
  // city: number[];
  // avatar: FileList;
  foo: string;
  bar: string;
};

const schema = Yup.object().shape({
  foo: Yup.string().min(3).required(),
  bar: Yup.string().min(10).required(),
  // avatar: Yup.mixed()
  //   .required()
  //   .test("fileSize", "The File is too large", (value: FileList) => {
  //     return value && value[0].size <= 2000000;
  //   }),
});

const CreateVacancy = () => {
  const { data } = useGetFormOptionsQuery();
  const { register, handleSubmit, watch, errors } = useForm<Inputs>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Inputs) => console.log(data);

  // console.log(watch("city"));
  console.log(errors);

  return (
    <div>
      <h1>Создать заявку</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <input type="checkbox" name="city[]" ref={register} value="1" /> */}
        {/* <input type="checkbox" name="city[]" ref={register} value="2" /> */}
        {/* <input type="checkbox" name="city[]" ref={register} value="3" /> */}
        FOO:
        <TextInput name="foo" hasError={!!errors.foo} ref={register} />
        <br />
        BAR:
        <TextInput name="bar" hasError={!!errors.bar} ref={register} />
        {/* <input type="file" name="avatar" ref={register({})} /> */}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateVacancy;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    await apolloClient.query({
      query: GET_FORM_OPTIONS,
    });
  } catch (err) {
    console.log(err);
  }

  return addApolloState(apolloClient, {
    props: {},
  });
};
