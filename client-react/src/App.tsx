import { gql, useQuery, useMutation } from "@apollo/client";
import Login from "./Login";

const QUERY = gql`
  {
    helloWorld
  }
`;

const UPLOAD_QUERY = gql`
  mutation MyUpload($file: Upload!) {
    uploadFile(file: $file)
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);
  const [mutate] = useMutation(UPLOAD_QUERY);

  const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { validity, files },
    } = evt;

    if (files) {
      const myFiles = Array.from(files);
      const file = myFiles[0];

      console.log(validity.valid);
      console.log(file);

      const isValid = validity.valid;

      if (isValid) {
        mutate({ variables: { file } });
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :((</div>;

  return (
    <div>
      <h1>My App</h1>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <form>
        <label htmlFor="my-upload">Avatar</label>
        <input onChange={onChange} type="file" id="my-upload" name="file" />
        <button>Upload</button>
      </form>

      <Login/>
    </div>
  );
}

export default App;
