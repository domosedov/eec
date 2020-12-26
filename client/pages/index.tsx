import Head from "next/head";
import Link from "next/link";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {GetServerSideProps, GetStaticProps} from "next";
import {initializeApollo} from "../lib/apolloClient";

const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            login
            email
        }
    }
`

export default function Home() {
    const [isMounted, setIsMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    const switchTheme = () => {
        if (isMounted) {
            setTheme(theme === "light" ? "dark" : "light");
        }
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const {data, loading, error} = useQuery(GET_ALL_USERS);

    if (error) return <div>Error...</div>;

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="bg-white text-black dark:bg-black dark:text-white">
                <h1>Main content</h1>
                <button className="bg-blue-500" onClick={switchTheme}>Switch theme</button>

                <Link href="/login">
                    <a>Login Page</a>
                </Link>

                <Link href="/me">
                    <a>Me Page</a>
                </Link>

                <div>
                    <pre>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>

            </main>

            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const apolloClient = initializeApollo(undefined);

    await apolloClient.query({
        query: GET_ALL_USERS
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    }
}