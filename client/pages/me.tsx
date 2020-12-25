import {gql, useQuery} from "@apollo/client";
import Link from 'next/link'

export default function MePage() {

  const ME_QUERY = gql`
      query Me {
          me {
              login
              email
              registeredAt
              role
          }
      }
  `

    const {data, error, loading} = useQuery(ME_QUERY)

    if (error) return <div>Error...</div>

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Me Page</h1>
            <Link href="/">
                <a>Home</a>
            </Link>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    )
}
