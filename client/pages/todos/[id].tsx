import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {initializeApollo} from "../../lib/apollo/apolloClient";
import {gql} from "@apollo/client";

// export const GET_TODO = gql``
//
const SingleTodoPage = () => {
    const {query} = useRouter()
    const { id } = query;
    return (
        <div>
            <h1>Single Todo Page {id}</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {

    const {id} = query;

    console.log({id})

    // const apolloClient = initializeApollo();
    //
    // await apolloClient.query({
    //     query: GET_TODO,
    // });

    return {
        props: {

        }
    }
}

export default SingleTodoPage;

