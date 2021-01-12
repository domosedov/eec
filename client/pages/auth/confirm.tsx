import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import {addApolloState, initializeApollo} from "../../lib/apollo/apolloClient";
import {gql} from "@apollo/client";
import {useConfirmUserRegisterMutation} from "../../generated/graphql";
import {useEffect} from "react";

export const CONFIRM_USER_REGISTER = gql`
    mutation ConfirmUserRegister($token: String!) {
        confirmUser(token: $token)
    }
`

const ConfirmUserRegisterPage = () => {
    const {query} = useRouter()
    const token = (query.token as string) || '';

    const [confirmUserRegister, {data, error, loading}] = useConfirmUserRegisterMutation({
        variables: {token}
    })

    useEffect(() => {
        (async () => {
            await confirmUserRegister()
        })()
    }, [token])

    if (error) return <div>Error...</div>

    if (loading && !data) return <div>Loading...</div>

    return (
        <div>
            <h1>Confirm Password</h1>
            <div>
                <pre>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    const token = (query.token as string) || '';

    const apolloClient = initializeApollo();

    try {
        await apolloClient.query({
            query: CONFIRM_USER_REGISTER,
            variables: { token }
        });
    } catch (e) {
        console.log(e)
    }

    return addApolloState(apolloClient, {
        props: {},
    });
}

export default ConfirmUserRegisterPage